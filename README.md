# [Dai:Si] - A modular framework for Dataset Search

This repository provides the source code for 'Dai:Si' - a frontend framework for querying a dataset search index. The name is an abbrevation of 'Dataset Search' in its phonetic spelling.
Dai:Si consists of two parts: a backend server (Node Server) and a frontend (Angular application). 
The Node middleware server handles the index requests and provides a convenient API for the frontend - a modular Angular app that can be easily adjusted for a specific domain. 

* [Angular app] 
* [Node Server] 

[Angular app]: https://github.com/fusion-jena/DatasetSearchUI/tree/master/angular
[Node Server]: https://github.com/fusion-jena/DatasetSearchUI/tree/master/node

## Demo

A live demo is available here: https://dev.gfbio.uni-jena.de/daisi/

The Node Server and its API is also available: https://dev.gfbio.uni-jena.de/daisi-api/api-docs/

## How to setup Dataset Search UI for an own index

TBD

## Issue Tracking

Please report bugs and issues in the GitHub issue tracker.

## Changelog
07.07.2021 second official release 0.3
* minimap added (select a dataset and if coordinates are present the geographic location is shown on the map)
* dataset basket with download function (select datasets, open the basket and download all files as zip)
* related datasets/publications are displayed
* improved citation dialog (related datasets/publications added)
* bugfix semantic search: expanded terms are only displayed when they occur in the dataset
* config variables for Node and Angular are now provided in separate environment files

26.03.2021 first official release 0.2

* color and css revised
* additional information on demand (mouseover) added
* components revised for more modular structure
* bugfix semantic search - expanded terms highlighted in title and description
* collapse/expand for longer descriptions and parameters

05.03.2021 initial release 0.1

## License
"Dai:Si" is distributed under the terms of the GNU LGPL v3.0. (https://www.gnu.org/licenses/lgpl-3.0.en.html) 
