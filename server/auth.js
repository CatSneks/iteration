const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { createUser } = require('./models/aTuneModels');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:5001/api/callback',
});

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 3600000, // 1 hour
  path: '/',
};

// Generate a random string for state verification
const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Login endpoint
router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-follow-read',
    'user-read-recently-played',
    'playlist-read-private',
    'playlist-read-collaborative',
  ];

  // Store state in cookie for verification
  res.cookie('spotify_auth_state', state, COOKIE_OPTIONS);

  // Create the authorization URL
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

// Callback endpoint
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    res.redirect('http://localhost:3000?error=state-mismatch');
    return;
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];

    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    const me = await spotifyApi.getMe();

    // Create or fetch user
    const user = await createUser({
      display_name: me.body.display_name,
      email: me.body.email,
    });

    // Set secure cookies
    res.cookie('userId', user.id, COOKIE_OPTIONS);
    res.cookie('accessToken', accessToken, COOKIE_OPTIONS);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    // Redirect to frontend
    res.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.redirect('http://localhost:3000?error=authentication-failed');
  }
});

// Check authentication status endpoint
router.get('/check-auth', async (req, res) => {
  const { accessToken, refreshToken, userId } = req.cookies;

  if (!accessToken || !refreshToken || !userId) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    // Set the access token for the API
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // Try to get user profile to verify token
    await spotifyApi.getMe();

    return res.json({
      authenticated: true,
      userId,
      accessToken,
    });
  } catch (error) {
    // Token might be expired, try to refresh
    try {
      const data = await spotifyApi.refreshAccessToken();
      const newAccessToken = data.body['access_token'];

      // Update cookie with new access token
      res.cookie('accessToken', newAccessToken, COOKIE_OPTIONS);
      spotifyApi.setAccessToken(newAccessToken);

      return res.json({
        authenticated: true,
        userId,
        accessToken: newAccessToken,
      });
    } catch (refreshError) {
      // If refresh fails, clear all cookies
      res.clearCookie('userId');
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.status(401).json({ authenticated: false });
    }
  }
});

// Get current user's profile
router.get('/me', async (req, res) => {
  try {
    // Verify and potentially refresh the token first
    const { accessToken } = req.cookies;
    spotifyApi.setAccessToken(accessToken);

    // Fetch multiple pieces of user data in parallel
    const [
      userProfile,
      topTracks,
      topArtists,
      playlists,
      following,
      recentlyPlayed,
    ] = await Promise.all([
      spotifyApi.getMe(),
      spotifyApi.getMyTopTracks({ limit: 10 }),
      spotifyApi.getMyTopArtists({ limit: 10 }),
      spotifyApi.getUserPlaylists(undefined, { limit: 20 }),
      spotifyApi.getFollowedArtists({ limit: 20 }),
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }),
    ]);

    // Construct enhanced user data object
    const enhancedUserData = {
      profile: {
        id: userProfile.body.id,
        email: userProfile.body.email,
        display_name: userProfile.body.display_name,
        images: userProfile.body.images,
        product: userProfile.body.product,
        country: userProfile.body.country,
        followers: userProfile.body.followers,
        external_urls: userProfile.body.external_urls,
      },
      topTracks: topTracks.body.items.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: {
          id: track.album.id,
          name: track.album.name,
          images: track.album.images,
        },
        preview_url: track.preview_url,
        external_urls: track.external_urls,
      })),
      topArtists: topArtists.body.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        images: artist.images,
        popularity: artist.popularity,
        external_urls: artist.external_urls,
      })),
      playlists: playlists.body.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        images: playlist.images,
        tracks_total: playlist.tracks.total,
        owner: {
          id: playlist.owner.id,
          display_name: playlist.owner.display_name,
        },
        external_urls: playlist.external_urls,
      })),
      following: following.body.artists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        images: artist.images,
        popularity: artist.popularity,
        external_urls: artist.external_urls,
      })),
      recentlyPlayed: recentlyPlayed.body.items.map((item) => ({
        track: {
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          album: {
            id: item.track.album.id,
            name: item.track.album.name,
            images: item.track.album.images,
          },
        },
        played_at: item.played_at,
      })),
    };

    res.json(enhancedUserData);
  } catch (error) {
    console.error('Error getting enhanced user data:', error);
    res.status(500).json({
      error: 'Failed to get user data',
      details: error.message,
    });
  }
});

// Logout endpoint
// Logout endpoint
router.get('/logout', async (req, res) => {
  // Clear all local cookies
  res.clearCookie('userId', { path: '/' });
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.clearCookie('spotify_auth_state', { path: '/' });

  // First, revoke the Spotify access if we have a token
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    try {
      // Set the token one last time to revoke it
      spotifyApi.setAccessToken(accessToken);
      await spotifyApi.resetAccessToken();
    } catch (error) {
      console.error('Error revoking Spotify token:', error);
      // Continue with logout even if token revocation fails
    }
  }

  // Send back a response that will handle the Spotify logout and redirection
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Logging out...</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .logout-message {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin: 10px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="logout-message">
          <div class="spinner"></div>
          <p>Logging you out...</p>
        </div>

        <script>
          function completeLogout() {
            // Create a hidden iframe to trigger Spotify logout
            const spotifyLogoutFrame = document.createElement('iframe');
            spotifyLogoutFrame.style.display = 'none';
            spotifyLogoutFrame.src = 'https://accounts.spotify.com/logout';
            document.body.appendChild(spotifyLogoutFrame);

            // After a short delay to ensure Spotify logout completes,
            // redirect to the home page
            setTimeout(() => {
              window.location.href = 'http://localhost:3000';
            }, 1500);
          }

          // Start the logout process
          completeLogout();
        </script>
      </body>
    </html>
  `);
});

module.exports = router;
