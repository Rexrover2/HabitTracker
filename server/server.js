const express = require('express');
const cors = require('cors');
const assert = require('assert');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const PORT = process.env.PORT || 5000;

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middlewares
app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const idToken = authorization.split(' ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uid = uid;
        next();
      })
      .catch((e) => {
        return res.status(401).send({
          error:
            'You are not allowed to access this resource! Your token is invalid!',
        });
      });
  } else {
    return res.status(401).send({ error: 'Bearer Token Missing!' });
  }
});

/** Tutorial on Auth0 api protection - https://scotch.io/tutorials/building-and-securing-a-modern-backend-api */
// If we do not get the correct credentials, we’ll return an appropriate message
/* app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Missing or invalid token' });
  }
}); */

/** End of tutorial */

// Routes: All routes are defined in ./routes
apiRouter = require('./routes/routes');
authRouter = require('./routes/auth.route');
app.use('', authRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
