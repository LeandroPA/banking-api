const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
require('dotenv').config();

const outputFile = process.env.SWAGGER_OUTPUT_JSON_PATH;
const endpointsFiles = ['./src/app.js'];

const doc = {
    info: {
        version: process.env.npm_package_version,
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "banking-api-gateway"
        },
        {
            url: "http://localhost:3001",
            description: "client-api"
        },
        {
            url: "http://localhost:3002",
            description: "account-api"
        },
        {
            url: "http://localhost:3003",
            description: "transaction-api"
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "client-api",
            "description": "Endpoints"
        }
    ],
    components: {
        schemas: {
            Error: {
                field: 'Error message'
            }
        },
        responses: {
            NotFound: {
                description: 'Not Found'
            },
            InvalidId: {
                description: 'Invalid id',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                        example: {
                            id: 'invalid id'
                        }
                    }
                }
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)
    // .then(() => {
    //     require('./bin/www');
    // })
    // .catch((err) => {
    //     console.error(`Error when starting application after swaggerAutogen: `, err);
    // });