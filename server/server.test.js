// tests/server.test.js
const request = require('supertest');
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./auth');
const aTuneRoutes = require('./routes/aTuneRoutes');

// Initialize a new Express app for testing
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mock Spotify API client and its methods
jest.mock('spotify-web-api-node', () => {
	return jest.fn().mockImplementation(() => ({
		clientCredentialsGrant: jest.fn().mockResolvedValue({
			body: { access_token: 'mockAccessToken', expires_in: 3600 },
		}),
		setAccessToken: jest.fn(),
		getRecommendations: jest.fn().mockResolvedValue({
			body: {
				tracks: [
					{
						name: 'Mock Track',
						artists: [{ name: 'Mock Artist' }],
						uri: 'spotify:track:mockUri',
						album: { images: [{ url: 'mockImage.jpg' }] },
					},
				],
			},
		}),
	}));
});

// Middleware to handle Spotify token retrieval (similar to server.js)
let cachedToken = null;
let tokenExpiryTime = null;
const spotifyApi = new SpotifyWebApi();

const getAccessToken = async (req, res, next) => {
	if (cachedToken && Date.now() < tokenExpiryTime) {
		spotifyApi.setAccessToken(cachedToken);
		return next();
	}

	try {
		const data = await spotifyApi.clientCredentialsGrant();
		cachedToken = data.body['access_token'];
		tokenExpiryTime = Date.now() + data.body['expires_in'] * 1000;
		spotifyApi.setAccessToken(cachedToken);
		next();
	} catch (err) {
		console.error('Error retrieving access token:', err);
		res.status(500).json({ error: 'Failed to authenticate with Spotify API' });
	}
};

// Attach routes and middleware directly to the App
app.use('/api', authRoutes);
app.use('/api', aTuneRoutes);

app.get('/recommendations', getAccessToken, async (req, res) => {
	const { seed_genres, target_valence, target_danceability } = req.query;

	if (!seed_genres || !target_valence || !target_danceability) {
		return res.status(400).json({
			error:
				'Missing required parameters: seed_genres, target_valence, target_danceability',
		});
	}

	try {
		const response = await spotifyApi.getRecommendations({
			seed_genres: seed_genres.split(','),
			target_valence: parseFloat(target_valence),
			target_danceability: parseFloat(target_danceability),
			limit: 1,
		});

		const recommendations = response.body.tracks.map((track) => ({
			name: track.name,
			artist: track.artists[0].name,
			uri: track.uri,
			artwork: track.album.images[track.album.images.length - 1]?.url,
		}));

		res.json({ recommendations });
	} catch (err) {
		console.error('Error fetching recommendations:', err);
		res.status(500).json({ error: 'Failed to fetch song recommendations' });
	}
});

// Error Catching 404 route
app.use((req, res, next) => {
	res.status(404).json({ err: 'An error occurred: Route not found' });
});

// Error handling
app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.status(err.status || 500).json({
		err: 'An error occurred',
		message: err.message || 'Internal Server Error',
	});
});

describe('Server Tests', () => {
	beforeEach(() => {
		cachedToken = null;
		tokenExpiryTime = null;
	});

	it('GET /recommendations - should return a song recommendation for valid parameters', async () => {
		const response = await request(app).get('/recommendations').query({
			seed_genres: 'rock',
			target_valence: 0.5,
			target_danceability: 0.5,
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('recommendations');
		expect(response.body.recommendations[0]).toEqual({
			name: 'Mock Track',
			artist: 'Mock Artist',
			uri: 'spotify:track:mockUri',
			artwork: 'mockImage.jpg',
		});
	});

	it('GET /recommendations - should return 400 for missing required parameters', async () => {
		const response = await request(app).get('/recommendations').query({
			seed_genres: 'rock',
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty(
			'error',
			'Missing required parameters: seed_genres, target_valence, target_danceability'
		);
	});

	it('GET /recommendations - should return 500 for Spotify API authentication error', async () => {
		const clientCredentialsGrantSpy = jest
			.spyOn(spotifyApi, 'clientCredentialsGrant')
			.mockRejectedValue(new Error('Auth error'));

		const response = await request(app).get('/recommendations').query({
			seed_genres: 'rock',
			target_valence: 0.5,
			target_danceability: 0.5,
		});

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty(
			'error',
			'Failed to authenticate with Spotify API'
		);

		clientCredentialsGrantSpy.mockRestore();
	});

	it('GET /unknown-route - should handle unknown route gracefully', async () => {
		const response = await request(app).get('/unknown-route');

		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			err: 'An error occurred: Route not found',
		});
	});
});
