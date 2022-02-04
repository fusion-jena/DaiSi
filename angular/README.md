# Dataset Search - Angular (Frontend)

The Angular frontend serves as user interface of the <Dataset Search UI> application.

## Components

The UI consists of multiple components that communicate with each other via internal services.

#### Search Input

#### Search Result

#### Filters

#### Paging

#### Suggestion 

#### Citation

#### Services

* local and remote services

## CSS adaptions

* create a new css file and add it to angular.json under the 'styles.css'. Overwrite all css classes you want to change. 

## Adding new index

Please follow the instructions below if you want to use [Dai:Si] for your own search index. Make sure that your index is available 

1. Create a new component for your index
2. Go to `app.component.ts` and add a new entry to the array of 'indexes' with a title and a URL (e.g., 'myNewIndex', '/myNewIndex' ).
3. Go to the `app-routing.module.ts`, import your newly created component and add an entry to the routes array, e.g.,

``const routes: Routes = [
  { path: '', component: GfbioComponent },
  { path: '/myNewIndex', component: MyNewIndex }
];
``

4. Go to the html file of the component that you created and add the components you want to use. For instance, if you need the search-result component, which displays a search result and also includes pagination, you should add

``<app-search-result [result]="result" (basket)="checkBox($event)" (from)="paginationClicked($event)"></app-search-result>``

5. Then go to the `*.ts` file and implement from "SearchResult"(example:go to the `gfbio.component.ts`). You need to pass the content information through the "result" parameter (subscribed to the `communicationService.getResult()`). If a user clicks on an entry in the pagination component, you can get the click's action and the page number from the "paginationClicked" function. If the user clicks a check box in the results, you can get the click's action and the checked results, from "checkBox" function. If you need the filters component, you need to add the 

``<app-filters [result]="result" (filters)="filterSubmitted($event)" [resetFilters]="resetFilters"></app-filters>``

Again you need to pass the results through a "result" parameter. If you need to clean the filters (example: new search key) by an action, 
you need to pass it by `resetFilters= true`. You can get the clicked filters by the "filterSubmitted" function.

If you need the search-input component, add 

``<app-search-input [checkBoxValues]="basketValues" (basketChecked)="basketChecked()" (searchKeyEmmit)="searchKeySubmitted($event)"></app-search-input>``

You can add the elements that you want to put into the basket by `basketValues`. If the user clicks on the basket, the action can be received by the `basketChecked` function. If the user clicks on one of the search buttons (search, semantic), the action can be received by the `searchKeySubmitted` function. The input of the function is an array. The first item is the search key and the second one is a boolean value, which shows if the search is semantic or not. Now you have all the information you need for sending the http request (such as search keys, filters, pagination, ...) - we are ready to send the request.

6. To send a request, you need a service which is responsible to map the results of the http request to the result object which is used in the search-result component to show the information. Create a new service under the services/local directory (example: `gfbio-preprocess-data.service.ts`. Go to the component that you want to send the request and inject the service in the constructor, e.g., "NodeService".

7. When calling the "search" method in the "NodeService", you need to pass 4 parameters (urlTerm, body, the service for mapping the result, parameters that you need in the mapping service). Check the example in the `Start-searching.Service.ts`.

## General Angular instructions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License
<Dataset Search UI> is distributed under the terms of the GNU LGPL v3.0. (https://www.gnu.org/licenses/lgpl-3.0.en.html) 
