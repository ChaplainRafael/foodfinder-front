# Food Finder Client

The frontend for Food Finder, a recipe discovery app that helps users find meals based on the ingredients they already have.

## Features

- Search Spoonacular recipes by ingredient list.
- Browse search results with pagination.
- View full recipe information and instructions.
- Discover a random recipe from the home page.
- Register and log in with the Food Finder server.
- Save recipes to a personal collection and remove them later.
- Responsive React interface with loading states and toast notifications.

## Tech Stack

- React 19
- React Router
- Axios
- Spoonacular API
- Create React App

## Requirements

- Node.js and npm
- A running Food Finder server for registration, login, and saved recipes
- A Spoonacular API key

## Installation

From this directory, install the dependencies:

```bash
npm install
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_KEY=your_spoonacular_api_key
REACT_APP_API_URL=http://localhost:5000
```

`REACT_APP_API_URL` is optional. If it is omitted, the client uses `http://localhost:5000` for the Food Finder server.

Restart the development server after changing environment variables. Do not commit `.env` or expose API keys in source control.

## Running the App

Start the client from the `client` directory:

```bash
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

For saved recipes and authentication, start the server from the project's `server` directory in a separate terminal. The client expects these server endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/recipes`
- `POST /api/recipes`
- `DELETE /api/recipes/:id`

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the development server. |
| `npm test` | Runs the test suite in watch mode. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run eject` | Ejects from Create React App. This is irreversible. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page and recipe inspiration. |
| `/search` | Search for recipes by ingredients. |
| `/recipes/:id` | View recipe details. |
| `/login` | Register or sign in. |
| `/saved` | View saved recipes. Requires authentication. |

## Project Structure

```text
src/
├── components/       # Pages and reusable UI components
│   └── styles/       # Component-specific stylesheets
├── utils/            # Pagination and protected-route helpers
├── App.js            # Application shell and routes
└── index.js          # React entry point
public/               # Static assets and app metadata
```
