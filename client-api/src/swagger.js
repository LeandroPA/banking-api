const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
require('dotenv').config();

const outputFile = process.env.SWAGGER_OUTPUT_JSON_PATH;
const endpointsFiles = ['./src/app.js'];

const doc = {
    info: {
        version: process.env.npm_package_version,
        title: 'My API',
        description: 'Documentation automatically generated by the <b>swagger-autogen</b> module.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'banking-api-gateway'
        },
        {
            url: 'http://localhost:3001',
            description: 'client-api'
        },
        {
            url: 'http://localhost:3002',
            description: 'account-api'
        },
        {
            url: 'http://localhost:3003',
            description: 'transaction-api'
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            'name': 'account-api',
            'description': 'Endpoints for accounts management.'
        },
        {
            'name': 'client-api',
            'description': 'Endpoints for clients management.'
        },
        {
            'name': 'transaction-api',
            'description': 'Endpoints for accounts\' transactions management.'
        },
    ],
    components: {
        schemas: {
            'New Person': {
                $fullname: 'Leandro Alencar',
                $documentNumber: '45747215612'
            },
            Person: {
                id: '63cc98a061eb8862867ac260',
                fullname: 'Leandro Alencar',
                documentNumber: '45747215612',
                type: 'physical',
                createdAt: '2023-01-22T02:40:08.906Z',
                updatedAt: '2023-01-22T02:40:08.906Z'
            },
            Error: {
                errors: {
                    field: 'Error message'
                }
            }
        },
        responses: {
            PersonCreated: {
                description: 'Resource created',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Person',
                        }
                    }
                }
            },
            GetPerson: {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Person',
                        }
                    }
                }
            },
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
                            errors: {
                                id: 'invalid id'
                            }
                        }
                    }
                }
            },
            PersonInvalidId: {
                description: 'Invalid id',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                        example: {
                            errors: {
                                id: 'id must be a valid id or document number'
                            }
                        }
                    }
                }
            },
            NewPersonValidationCheck: {
                description: 'Errors on validating request',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                        example: {
                            errors: {
                                fullname: 'fullname is required',
                                documentNumber: 'Invalid documentNumber format'
                            }
                        }
                    }
                }
            },
            DuplicateDocumentNumber: {
                description: 'Duplicate value for documentNumber',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                        example: {
                            errors: {
                                documentNumber: 'Invalid documentNumber format'
                            }
                        }
                    }
                }
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc);