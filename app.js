// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const settings = require('./settings.json');

// dependencies - bas
const loginRoute = require('./routes/login');
const installRoute = require('./routes/install');
const auxRoute = require('./routes/aux');
const { checkAccess } = require('./controller/session');

// app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
const port = settings.serverPort | 4000;

// routing - bas
app.use(async (req, res, next) => {
  try {
    await checkAccess(req.url, req.headers.authorization, req.method);
    next();
  } catch(err) {
    return res.status(403).json({ message: 'invalid access' });
  }
});
app.use('/api/login', loginRoute);
app.use('/api/install', installRoute);
app.use('/api/role', auxRoute);
app.use('/api/setting', auxRoute);
app.use('/api/tenant', auxRoute);
app.use('/api/user', auxRoute);
app.use('/api/country', auxRoute);
app.use('/api/currency', auxRoute);

// routing - others
app.get('/*', (req, res) =>  res.status(404).send('Invalid'));

// run
app.listen(port, () => console.log(`app listening in localhost:${port}`));

module.exports = { app };
