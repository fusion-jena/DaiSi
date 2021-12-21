# [Dai:Si] - A modular framework for Dataset Search

This repository provides the source code for [Dai:Si] - a frontend framework for querying a dataset search index. The name is an abbrevation of 'Dataset Search' in its phonetic spelling.
[Dai:Si] consists of two parts: a backend server (Node Server) and a frontend (Angular application). 
The Node middleware server handles the index requests and provides a convenient API for the frontend - a modular Angular app that can be easily adjusted for a specific domain. [Dai:Si] also provides a semantic search for biological datasets. 

* [Angular app] 
* [Node Server] 

[Angular app]: https://github.com/fusion-jena/DatasetSearchUI/tree/master/angular
[Node Server]: https://github.com/fusion-jena/DatasetSearchUI/tree/master/node

## Demo

A live demo is available here: https://dev.gfbio.uni-jena.de/daisi/

The Node Server and its API is also available: https://dev.gfbio.uni-jena.de/daisi-api/api-docs/

## How to setup Dai:Si for your own index

Setting up Dai:Si for your own search index comprises a few steps that are additionally described in the [Node Server] and the [Angular app] sections.
 
1. create a new module in the NodeServer for your search index (myIndex.js) and provide a search ``/search`` function
2. add your module to the app.js file and add the new APIs to swagger
3. test the connection, e.g., (http://localhost:3000/myIndex/search, http://localhost:3000/api-docs)
4. add further function to your module if necessary, e.g., ``/suggest`` (for auto-complete function) and ``/semantic-search`` (if you want to expand the query keywords on related terms)
5. create a new component with the angular cli, e.g., ``ng generate component myIndex``
6. in ``app.components.ts`` and ``app-routing.module.ts``  add your component to the index and route arrays
7. implement your component (add the required components to the html file, add the methods to the ts file)
8. map your index fields to Dai:Si’s underlying data model (create a new service, e.g., ``myIndex-preprocess-data.service.ts`` file)
9. in your new component, call the node service and pass the parameters of your custom index
10. test your new application: http://localhost:4200/myIndex


## Issue Tracking

Please report bugs and issues in the GitHub issue tracker.

## Changelog

21.12.2021 v0.5
*

29.07.2021 v0.4_beta
* Terminology widget added (info box in semantic search - explanation on expanded terms)
* dataset basket improvements: spinner added (creation of zip file can take some seconds), 'empty basket' function

07.07.2021 v0.3
* minimap added (select a dataset and if coordinates are present the geographic location is shown on the map)
* dataset basket with download function (select datasets, open the basket and download all files as zip)
* related datasets/publications are displayed
* improved citation dialog (related datasets/publications added)
* bugfix semantic search: expanded terms are only displayed when they occur in the dataset
* config variables for Node and Angular are now provided in separate environment files

26.03.2021 v0.2

* color and css revised
* additional information on demand (mouseover) added
* components revised for more modular structure
* bugfix semantic search - expanded terms highlighted in title and description
* collapse/expand for longer descriptions and parameters

05.03.2021 v0.1

## License
[Dai:Si] is distributed under the terms of the GNU LGPL v3.0. (https://www.gnu.org/licenses/lgpl-3.0.en.html) 
