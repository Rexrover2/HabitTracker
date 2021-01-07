const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const serviceAccount = require('./serviceAccountKey.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const PORT = 5000;

const app = express();

// Middleware - cors

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
const csrfMiddleware = csrf({ cookie: true });
app.use(csrfMiddleware);

app.all('*', (req, res, next) => {
  console.log('Cookies');
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
/* app.use(function (req, res, next) {
  // res.locals._csrf = req.csrfToken();
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
}); */

// All routes are defined in ./routes
apiRouter = require('./routes/routes');
app.use('/api', apiRouter);

app.get('/sessionLogout', (req, res) => {
  res.clearCookie('session');
  // res.redirect('/login');
  res.end();
});

app.post('/sessionLogin', (req, res) => {
  try {
    const idToken = req.body.idToken.toString();
    console.log('HI');
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = {
            maxAge: expiresIn,
            httpOnly: true,
            path: 'http://localhost:3000',
          };
          res.cookie('session', sessionCookie, options);
          res.end(JSON.stringify({ status: 'success' }));
        },
        (error) => {
          res.status(401).send('UNAUTHORIZED REQUEST!');
        }
      );
  } catch (err) {
    console.log('HI');
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
