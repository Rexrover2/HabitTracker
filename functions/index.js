const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const PORT = 5000;

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middlewares
app.use(cors({ origin: true }));
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

// Routes: All routes are defined in ./routes
apiRouter = require('./routes/routes');
authRouter = require('./routes/auth.route');
app.use('', authRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

// exports.app = functions.https.onRequest(app);
