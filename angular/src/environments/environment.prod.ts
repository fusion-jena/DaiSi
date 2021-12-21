export const environment = {
  production: true,
  
  Keycloak_Url: '',
  Keycloak_RedirectUri: 'https://dev.gfbio.uni-jena.de/daisi',
  Keycloak_Realm: '',
  Keycloak_ClientId: '',
  
  apiUrl: 'https://dev.gfbio.uni-jena.de/daisi-api',
  context: '/gfbio',
  searchUrl: '/search',
  semSearchUrl: '/semantic-search',
  suggestUrl: '/suggest',
  basketUrl: '/basketDownload',
  addToBasketUrl: '/addToBasket',
  deleteFromBasket: '/deleteFromBasket',
  deleteAllBasket: '/deleteAllBasket',
  readFromBasketUrl: '/api/baskets/user/',
  imagePath: 'assets/img/',
  vatImg: 'vat.png',
  semSearchImg: 'icon_semsearch3.png',
  textAlertSemSearchError: 'A connection error occured. Please reduce the amount of search terms or try the search again.',
  textAlertBasketErrorDownload: 'An error occured during the download.\nPlease contact the administrator for more information.',
  textTooltipBasketVATvisualizable: 'dataset can be visualized in VAT',
  textTooltipBasketVATnotVisualizable: 'dataset can not be visualized in VAT',
  textTooltipBasketDataAvailable: 'data are available for download',
  textTooltipBasketDataNotAvailable: 'data are not available for download',
  textTooltipBasketMetadataAvailable: 'metadata are available for download',
  textTooltipBasketMetadataNotAvailable: 'metadata are not available for download',
  textTooltipBasketMultimediaAvailable: 'multimedia are available for download',
  textTooltipBasketMultimediaNotAvailable: 'multimedia are not available for download',
  textTooltipBasketRemove: 'remove dataset from basket',
  textTooltipBasketEmpty: 'Please select a dataset from the search result.',
  textTSWidgetInfo: 'Your search query is expanded with relational terms obtained from GFBio\'s Terminology Service. Some terms can be further expanded with more narrower or broader terms. Click on the buttons to obtain all descendants or an ancestor. With a double-click on the returned narrower or broader terms you can add them to the search field.'
};
