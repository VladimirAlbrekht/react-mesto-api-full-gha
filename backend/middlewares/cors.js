
const allowedCors = [
  'https://mesto-15.nomoredomains.monster',
  'http://mesto-15.nomoredomains.monster',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedHeaders = [
  'Content-Type',
  'Authorization',
];

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
