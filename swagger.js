require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Community Booking System API',
        description: 'API documentation for the Community Booking System'
    },
    host: process.env.SWAGGER_HOST || 'cse341-reservations-4fim.onrender.com',
    schemes: [(process.env.SWAGGER_SCHEME || 'https')],
    definitions: {
        Area: {
            name: "BBQ Pit",
            description: "",
            price: 150
        },
        UpdatedArea: {
            name: "BBQ Pit",
            description: "Can fit 50 people",
            price: 200
        },
        Reservation: {
            area: "Club House",
            date: "12/27/25"
        },
        UpdatedReservation: {
            area: "Club House",
            date: "12/28/25"
        },
        Calendar: {
            date: "12/30/25",
            areaId: "692a479eeaf18049482f6c64",
            isAvailable: false,
            notes: "Is reserved for community meeting"
        },
        UpdatedCalendar: {
            date: "12/30/25",
            areaId: "692a479eeaf18049482f6c64",
            isAvailable: true,
            notes: ""
        },
        
    }
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
