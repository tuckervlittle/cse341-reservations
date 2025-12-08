const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./middleware/passport'); // Google OAuth

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger Docs
const swaggerUi = require('swagger-ui-express');
let swaggerDocument;
try {
  swaggerDocument = require('./swagger.json');
} catch (err) {
  // swagger.json may not exist until swagger.js runs
  swaggerDocument = null;
}
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Routes
app.use('/', require('./routes'));

// // Testing login state 
// app.get('/', (req, res) => {
//   if (!req.session.user) {
//     return res.send("Logged Out");
//   }
//   return res.send("Logged in as " + req.session.user.displayName);
// });

// Google Callback
app.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Database
const db = require('./models');
db.mongoose.set('strictQuery', true);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
 });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});