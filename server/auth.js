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

  // Store state in session or cookie for verification
  res.cookie('spotify_auth_state', state);

  // Create the authorization URL
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

// Callback endpoint
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#/error/state-mismatch');
    return;
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);

    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    const me = await spotifyApi.getMe();

    // Create or fetch user with only required fields
    const user = await createUser({
      display_name: me.body.display_name,
      email: me.body.email,
    });

    // Store tokens and basic user info
    const userData = {
      accessToken: data.body['access_token'],
      refreshToken: data.body['refresh_token'],
      expiresIn: data.body['expires_in'],
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    res.redirect('/api/me');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.redirect('/#/error/invalid-token');
  }
});

// Get current user's profile
router.get('/me', async (req, res) => {
  try {
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

router.get('/logout', (req, res) => {
  // Clear the auth state cookie
  res.clearCookie('spotify_auth_state');

  // Redirect to Spotify's logout page, then redirect back to your app
  const spotifyLogoutUrl = 'https://accounts.spotify.com/logout';
  const appRedirectUrl = 'http://localhost:3000'; // or whatever your frontend URL is

  res.redirect(`${spotifyLogoutUrl}`);
});

module.exports = router;
