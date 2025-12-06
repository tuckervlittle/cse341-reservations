require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Community Booking System API',
        description: 'API documentation for the Community Booking System'
    },
    host: process.env.SWAGGER_HOST || 'cse341-reservations-4fim.onrender.com',
    schemes: [(process.env.SWAGGER_SCHEME || 'https')]
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsfiles, doc);

/* When I use Loclahost*/

// require('dotenv').config();
// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//     info: {
//         title: 'Community Booking System API',
//         description: 'API documentation for the Community Booking System'
//     },
//     host: process.env.SWAGGER_HOST || 'localhost:8080',
//     schemes: [process.env.SWAGGER_SCHEME || 'http'],
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/index.js'];

// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   require('./server.js');
// });
