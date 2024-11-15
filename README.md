# aTune - Habit Tracking with Musical Vibes

A React-based habit tracking application that integrates with Spotify to enhance your daily activities with personalized music selections. This project combines habit formation with mood-based music recommendations to create a more engaging and enjoyable experience.

## Features

- 🎵 Spotify Integration
  - Login with Spotify
  - Access to personalized music recommendations
  - Playlist creation based on activities and moods
- 📝 Habit Tracking
  - Create and manage daily habits
  - Associate habits with specific moods/vibes
  - Track habit completion
- 🎨 User Interface
  - Clean, modern design
  - Responsive layout
  - Intuitive habit creation flow
- 🔒 Secure Authentication
  - OAuth 2.0 with Spotify
  - Secure cookie handling
  - Automatic token refresh

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (latest stable version)
- npm or yarn
- A Spotify Developer account and application credentials

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

2. Configure your Spotify Developer Application:
   - Set the redirect URI to: `http://localhost:5001/api/callback`
   - Enable the necessary Spotify Web API scopes:
     - user-read-private
     - user-read-email
     - user-top-read
     - playlist-modify-public
     - playlist-modify-private
     - user-follow-read
     - user-read-recently-played
     - playlist-read-private
     - playlist-read-collaborative

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Start the backend server:

```bash
cd server
npm install
npm start
```

The application will be available at `http://localhost:3000`, with the backend running at `http://localhost:5001`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

## Project Structure

```
src/
├── components/
│   ├── CreateHabit.jsx     # Habit creation modal
│   ├── Main.jsx           # Main application layout
│   ├── NavBar.jsx         # Navigation component
│   └── Settings.jsx       # Settings panel
├── App.jsx                # Root application component
└── auth.js               # Authentication handling
```

## Authentication Flow

1. User clicks "Login with Spotify"
2. User is redirected to Spotify login
3. After successful authentication, Spotify redirects back to the application
4. Access tokens are securely stored in HTTP-only cookies
5. Automatic token refresh handling is implemented

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
