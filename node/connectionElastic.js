
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ 'http://ws.pangaea.de/es/dataportal-gfbio/pansimple'],
   log: "trace"
});

/** check Connection **/
/** ToDO: add path ('/_search') to URL!
client.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });

/*** search ***/
/*** path '/_search' is added automatically! ***/
 /*exports.sendQuery = client.search({
//client.search({
    body: {
		query: {
			bool: {
				must: {
					query_string: {
						query: 'quercus'
					}
				}
			}
		}
  }
}).then(function(resp) {
    console.log(resp);
	return resp;
}, function(err) {
    console.trace(err.message);
});*/


module.exports = {
 
  sendQuery (bodyReqJSON) {
	  console.log(bodyReqJSON);
	//const bodyReqJSON = bodyParser.json(bodyRequest);
	
	console.log("queryTerm:" + bodyReqJSON.queryterm);
	
	/*** only works with newer elasticsearch version !!! ***/
    /*const body = {
      query: {
			bool: {
				must: {
					query_string: {
						query: bodyReqJSON.queryterm
						
					}
				}
			}
	  },
	  aggs: {
			taxonomy: {
				terms: {
					field: 'taxonomyFacet',
					size: 50
				}
			},
			region: {
				terms: {
					field: 'regionFacet',
					size: 50
				}
			},
			parameter: {
				terms: {
					field: 'parameterFacet',
					size: 50
				}
			},
			gfbioDataKind: {
				terms: {
					field: 'gfbioDataKindFacet',
					size: 50
				}
			},
			dataCenter: {
				terms: {
					field: 'dataCenterFacet',
					size: 50
				}
			}
			
		}
    }
	const defaultOperator = 'AND';
	var from = 0;
	var size = 10;
	
	if(bodyReqJSON.from != 'undefined' && bodyReqJSON.from >0){
		from = bodyReqJSON.from
	}
	
	if(bodyReqJSON.size != 'undefined' && bodyReqJSON.size >0){
		size = bodyReqJSON.size
	}*/
	  
	/*const body = {
		
    query: {
        bool: {
            filter:[{term:{dataCenterFacet:"Data Center DSMZ"}}]
        }
    },
	default_operator:"and",
    from:0,
    size:10

		
	}*/
	//return client.search({from, size, body })

	var from = 0;
	var size = 10;
	var filter = [];
	
	if(bodyReqJSON.from != 'undefined' && bodyReqJSON.from >=0){
		from = bodyReqJSON.from
	}

	
	if(bodyReqJSON.size != 'undefined' && bodyReqJSON.size >=0){
		size = bodyReqJSON.size
	}
	
	if(bodyReqJSON.filter != 'undefined' ){
		filter = bodyReqJSON.filter
	}
	
    const body = {

			query:{
				function_score:{
					query:{
						bool:{
							must:{
								simple_query_string:{
									query:bodyReqJSON.queryterm,
									fields:["fulltext","fulltext.folded^.7","citation^3","citation.folded^2.1"],
									default_operator:"and"
								}
							},
							//e.g., filter:[{term:{citation_authorFacet:"Latalowa, Malgorzata"}}]
							filter: bodyReqJSON.filter
						}
					},
					functions:[{field_value_factor:{field:"boost"}}],score_mode:"multiply"}
			},
			//from:fromN,
			//size:sizeN,
			aggs:{
				taxonomy:{
					terms:{field:"taxonomyFacet",size:50}
				},
				region:{
					terms:{field:"regionFacet",size:50}
				},
				parameter:{
					terms:{field:'parameterFacet',size: 50}
				},
				gfbioDataKind:{
					terms: {field: 'gfbioDataKindFacet',size: 50}
				},
				dataCenter: {
					terms: {field: 'dataCenterFacet', size: 50}
				},
				type: {
					terms: {field: 'typeFacet', size: 50}
				}
			}
	}
	  
    return client.search({from, size, body })
    
  }
}



/*module.exports = {

  sendQuery: function(queryTerm) {
	const body = {
      query: {
			bool: {
				must: {
					query_string: {
						query: queryTerm
					}
				}
			}
	  }
    }
    
    return client.search({ from: 0, size: 10, body })
  },
  suggest: function(term) {
	console.log(term);
	//const suggestField = 'suggest';
	//const suggestMode = 'always';
	//const suggestSize = 12;
	//const suggestText = term;
	//const suggest_text = {term};
    const body = {
     
      suggest: {
        gotsuggest: {
          text: term,
          term: { field: 'suggest', size: 12}
		  
        }
      }
    }
    
    return client.search({ body})

  }
}
*/

/* module export pattern
module.exports = {
    method: function() {},
    otherMethod: function() {},
};*/




/*
client.search({  
  index: 'gov',
  type: 'constituencies',
  body: {
    query: {
      match: { "constituencyname": "Harwich" }
    },
  }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});
*/
