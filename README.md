# Music Player Web App

This is a music player web application built using **Next.js** for the frontend, **Recoil** for state management, and various APIs to fetch and manage music data and images. The app allows users to play songs, manage playlists, view recently played tracks, and toggle between day and night modes.

## Tech Stack

- **Next.js**: Used for building the frontend, utilizing server-side rendering for better performance.
- **Recoil**: Manages global state efficiently, especially for handling song data across components.
- **TypeScript**: Ensures type safety across the application.
- **Tailwind CSS**: For styling the UI with a utility-first approach.

## Features

- **Audio Playback**: Plays songs with controls for play/pause and volume.
- **Recently Played List**: Displays a list of recently played songs that updates in real-time.
- **Playlist Management**: Fetches and displays playlists using an external API.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Persistent Data**: Uses session storage to restore song data across page reloads.

## Getting Started

To run this project locally:

```bash
git clone https://github.com/your-repo/music-player-app.git
cd music-player-app
npm install
npm run dev
