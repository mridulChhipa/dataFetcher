# Vite + Node.js Full Stack App

This is a full-stack web application using Vite for the frontend and Node.js with Express for the backend.

## Project Structure

```
/frontend        # Frontend (React + Vite)
/backend         # Backend (Node.js + Express)
```

## Prerequisites

- Node.js (>= 20.x recommended)
- npm or yarn

## Installation

Clone the repository and install dependencies for both frontend and backend.

```sh
git clone https://github.com/mridulChhipa/dataFetcher.git
cd dataFetcher
```

### Backend Setup
```sh
cd backend
npm install
```

### Frontend Setup
```sh
cd frontend
npm install
```

## Running the App

### Start the Backend
```sh
cd backend
npm start
```
The backend runs on `http://localhost:3000` (default, can be changed in `.env`).

### Start the Frontend
```sh
cd frontend
npm run dev
```
The frontend runs on `http://localhost:5173` (default, Vite's default dev server).

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:
This one is for backend
```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
PORT = 3000
CLIENT_URL=http://localhost:5173
```

This one is for frontend
```env
VITE_BACKEND_URL='http://localhost:3000'
```
## Building for Production

### Build Frontend
```sh
cd frontend
npm run build
```
This generates a production build in the `frontend/dist` folder.

### Serve Frontend with Backend
Copy the built frontend into the backend's `public` folder:
```sh
cp -r frontend/dist backend/public
```
Then modify the backend `index.js` to serve static files:
```js
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
```

Now restart the backend, and it will serve both frontend and backend.

## Deployment

For deployment, you can use platforms like:
- **Frontend**: Vercel (Recommended), Netlify
- **Backend**: Vercel (Recommended), Heroku, Railway, Render
