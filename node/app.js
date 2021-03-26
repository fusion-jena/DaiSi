var express = require('express'); 
var logger = require('morgan');
var bodyParser = require('body-parser'); 
var Cors = require('cors'); //CORS
var swaggerJSDoc= require('swagger-jsdoc');
var swaggerUi= require('swagger-ui-express');
const axios = require('axios'); //http calls

const app = express();

//start application on port 3000
const API_PORT = process.env.API_PORT || 3000;

//swagger definition
const swaggerDefinition = {
  info: {
    title: 'GFBio/NFDI4Biodiversity Search API',
    version: '1.0.0',
    description: 'Endpoints for dataset search',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

//keep each index in a separate module
const options = {
  swaggerDefinition,
  apis: ['gfbio.js']
};

//initialize swagger
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/*const whitelist = [
  'http://localhost:3031',
  'http://localhost:3000',
  'http://localhost:3003',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};*/



//load swagger, cors and bodyparser
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//required for PUT and POST request to ensure that the data posted is
// in json format and has a maximum size
// if larger input data is permitted - adjust size here 
app.use(express.json(
{inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))


//gfbio index (elastic search)
var elastic_gfbio = require('./gfbio');



// eslint-disable-next-line no-console
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

app.use('/gfbio', elastic_gfbio);
