# Dataset Search - Node Server (Backend)

The Node Server serves as middleware to handle requests from the search index and to provide an API for frontend developers. We provide the code for an elasticsearch index in the scope of the [GFBio project](https://www.gfbio.org).


## Prerequisites

### NodeJS
You need to install [NodeJS](https://nodejs.org/en/) on your machine. NodeJS requires a [package manager](https://nodejs.org/en/download/package-manager/).
<Dataset Search UI> was developed and tested with NodeJS v14.15.4 under Windows 10 and Ubuntu 18.
Check your node version with ```node -v```


## Installation and Start

Install all necessary dependencies: Navigate to the Node server folder and run

```npm install```

If there are no conflicts, start the server with

 ```node app```
 
The server now is accessible under http://localhost:3000. A swagger documentation describing all request is available under http://localhost:3000/api-docs.

Please report issues and bugs in the GitHub issue tracker.

## Settings

Change the port in the app.js file


## Changelog

05.03.2021 initial release 1.0

## License
<Dataset Search UI> is distributed under the terms of the GNU LGPL v3.0. (https://www.gnu.org/licenses/lgpl-3.0.en.html) 
