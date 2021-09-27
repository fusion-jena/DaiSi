# [Dai:Si] - Node Server (Backend)

The Node Server serves as middleware to handle requests from the search index and to provide an API for frontend developers. We provide the code for an elasticsearch index in the scope of the [GFBio project](https://www.gfbio.org).


## Prerequisites

### NodeJS
You need to install [NodeJS](https://nodejs.org/en/) on your machine. NodeJS requires a [package manager](https://nodejs.org/en/download/package-manager/).
[Dai:Si] was developed and tested with NodeJS v14.15.4 under Windows 10 and Ubuntu 18.
Check your node version with ```node -v```


## Installation and Start

Install all necessary dependencies: Navigate to the Node server folder and run

```npm install```

Create a file named 

```.env```

in your root folder and add the environment variables for API_HOST and HOST and further index specific URLs according to your local settings. We provide an '.envExample' file as explanation.

If there are no conflicts, start the server with

 ```node app```
 
The server now is accessible under http://localhost:3000. A swagger documentation describing all request is available under http://localhost:3000/api-docs.

Please report issues and bugs in the GitHub issue tracker.

## Settings

Change the port in the app.js file

## Integrating an own/new indexes

Create a new file, e.g., `myIndex.js` and add this new module in the const swagger options

``const options = {
  swaggerDefinition,
  apis: ['gfbio.js', 'myIndex.js']
};``

Integrate the new module and add it with an own URL

``var elastic_myIndex = require('./myIndex');
app.use('/myIndex', elastic_myIndex);``

Implement at least a '/search' function, and if available '/suggest' and '/semantic-search'. 
An example for elasticsearch is provided in the gfbio module. Adjust the facets for your needs.

``'aggs': {
            'taxonomy': {
                'terms': {
                    'field': 'taxonomyFacet',
                    'size': 50
                }
            }, [...]``

Test your new search function, e.g.: http://localhost:3000/myIndex/search

## License
[Dai:Si] is distributed under the terms of the GNU LGPL v3.0. (https://www.gnu.org/licenses/lgpl-3.0.en.html) 
