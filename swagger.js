require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Community Booking System API',
        description: 'API documentation for the Community Booking System'
    },
    host: process.env.SWAGGER_HOST || 'cse341-reservations.onrender.com',
    schemes: [(process.env.SWAGGER_SCHEME || 'https')]
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsfiles, doc);