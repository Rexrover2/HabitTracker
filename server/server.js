const express = require('express');
const cors = require('cors');
const jwtCheck = require('./auth');

const PORT = 5000;

const app = express();

// Middleware - cors
app.use(cors());
app.use(express.json());
app.use(jwtCheck);

/** Tutorial on Auth0 api protection - https://scotch.io/tutorials/building-and-securing-a-modern-backend-api */
// If we do not get the correct credentials, we’ll return an appropriate message
/* app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Missing or invalid token' });
  }
}); */

/** End of tutorial */

// All routes are defined in ./routes
apiRouter = require('./routes/routes');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
