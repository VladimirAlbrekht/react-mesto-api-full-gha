
const CORS_WHITELIST = ['https://mesto-15.nomoredomains.monster', 
'http://mesto-15.nomoredomains.monster', 
'http://localhost:3001',
];

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOption;