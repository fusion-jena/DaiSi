# Dataset Search - Node Server (Backend)

The Node Server serves as middleware to handle requests from the search index and to provide an API for frontend developers. We provide the code for an elasticsearch index in the scope of the [GFBio project](https://www.gfbio.org).


## Prerequisites

### NodeJS
You need to install [NodeJS](https://nodejs.org/en/) on your machine. NodeJS requires a [package manager](https://nodejs.org/en/download/package-manager/).
<Dataset Search UI> was developed and tested with NodeJS v14.18.1 and npm 6.14.15 under Windows 10 and Ubuntu 18/20.
Check your node version with ```node -v```

### XAMPP/ MySQL
You need to setup a DB to save dataset baskets. For development purposes [XAMPP](https://www.apachefriends.org/download.html) is sufficient, for production consider a real DB, e.g., [MySQL](https://www.mysql.com/de/).
In the default settings, the system assumes to access a database called 'gfbio'. However, you can edit the DB name and the credentials in the .env file.

Create a new DB in your database system and run the statement provided in 'table.txt' to create the necessary table. Configure the .env file with your DB settings.

### Settings
All server settings need to be listed in a file called '.env'. Inside the 'NodeServer' folder, create a file '.env' and add the following settings:


```
### default port and host
APP_PORT=3000
HOST="localhost:3000"

### GFBio module settings
GFBIOTS_URL="http://terminologies.gfbio.org/api/terminologies/"
TERMINOLOGY_SUGGEST_URL = "http://terminologies.gfbio.org/api/terminologies/suggest/"
PANGAEA_URL="https://ws.pangaea.de/es/dataportal-gfbio/_search"
PANGAEA_SUGGEST_URL="https://ws.pangaea.de/es/dataportal-gfbio/_suggest"

### Authentication settings 
Keycloak_ClientId="<ClientID>"
Keycloak_BearerOnly=false
Keycloak_ServerUrl="<KeycloakServer>"
Keycloak_Realm="<Realm>"
Keycloak_Secret="<YourSecretKey>"

### DB settings
MySQL_Host="localhost"
MySQL_Port=3306
MySQL_User="<User>"
MySQL_Password="<Password>"
MySQL_Database="gfbio" 

```


## Installation and Start

Install all necessary dependencies: Navigate to the Node server folder and run

```npm install```

If there are no conflicts, start the server with

 ```node app```
 
The server now is accessible under http://localhost:3000. A swagger documentation describing all request is available under http://localhost:3000/api-docs.

Please report issues and bugs in the GitHub issue tracker.

