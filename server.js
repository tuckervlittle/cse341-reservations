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

// Sessions
app.use( session({ secret: process.env.SESSION_SECRET || 'abc123', resave: false, saveUninitialized: false, }) );

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

// Export app for testing
module.exports = app;

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}