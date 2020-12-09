const express = require('express');
const cors = require('cors');
const pool = require('./db');

const PORT = 5000;

const app = express();

// Middleware - cors
app.use(cors());
app.use(express.json());

// All routes are defined in ./routes
apiRouter = require('./routes/routes');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
