const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Community Booking System API',
        description: 'API documentation for the Community Booking System'
    },
    host: 'localhost:8080',
    schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

swaggerAutogen(outputfile, endpointsfiles, doc);