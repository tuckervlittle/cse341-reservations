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
            areaName: "Club House",
            date: "12/27/25"
        },
        UpdatedReservation: {
            status: "approved",
            admin_comment: "Approved by admin"
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
        User: {
            username: "Tucker",
            fullName: "Tucker Little",
            role: "resident",
            dni: "99999999",
            email: "tucker.little95@gmail.com"
        },
        UpdatedUser: {
            username: "Tucker",
            fullName: "Tucker Little",
            role: "admin",
            dni: "99999999",
            email: "tucker.little95@gmail.com"
        }
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
