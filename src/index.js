import React from 'react';
import ReactDOM from 'react-dom/client';
import express from 'express';
import dotenv from 'dotenv'; // for loading environment variables
import App from './App';
import './index.css';
import aTuneRoutes  from './routes/aTuneRoutes';

dotenv.config(); // ensure the environment variables are loaded

const app = express(); // app, new instance of Express()
const port = 3000;

app.use(express.json());

app.use('/api', aTuneRoutes); // /api/dayview will be routed to the associated handler in aTuneRoutes

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign({}, defaultErr, err); // Merge default error with provided error
  console.log(errorObj.log); // Log the error
  return res.status(errorObj.status).json(errorObj.message); // Return the error to the client
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
