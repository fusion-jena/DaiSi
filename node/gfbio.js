var express = require('express');
var app = express();
var router = require('express').Router();
var bodyParser = require('body-parser').json();
const axios = require('axios'); //http calls

// module to establish a connection to Elasticsearch
// currently not needed
//var search = require('./connectionElastic');

var GFBioTS_URL = "http://terminologies.gfbio.org/api/terminologies/";
var PANGAEA_URL = "http://ws.pangaea.de/es/dataportal-gfbio/_search";

// Sets up the routes.  
  /********************** GFBIO code *******************/
  /**
  * POST /gfbio/search
  * Search for a term 
  */
  /**
   * @swagger
   * /gfbio/search:
   *   post:
   *     description: Returns search results
   *     tags: [Search GFBio - Elastic index]
   *     summary: returns a search result
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: queryterm
   *         description: the query as string
   *         schema:
   *            type: object
   *            required:
   *              - queryterm
   *            properties:
   *              queryterm:
   *                type: string
   *                example: fungi
   *              from:
   *                type: integer
   *                description: from which page to start?
   *                example: 0
   *              size:
   *                type: integer
   *                description: how many datasets to return per page?
   *                example: 10
   *     responses:
   *       201:
   *         description: hits.hits contains an array with dataset objects matching the query.
   */
router.post('/search', (req, res) => {
	
		 //in case you want to use the elasticmodule
		 /*search.sendQuery(req.body).then(resp=>{
			
			return res.status(200).send(resp);
			
		})
		.catch(err=>{
			console.log(err);
			return res.status(500).json({
				msg:'Error', err
			});
		});*/
		
		/* we utilize axios for calling elasticsearch
		* a request should like this
		* {"queryterm":"quercus","from":0,"size":10,"filter":[]}
		*/
		
		
		//get the keyword from the body
		const keyword = req.body.queryterm;

		 let filter = [];
		 let from = 0;
		 let size = 0;

		// get from, size and filters from the body
		if (req.body.from !== 'undefined' && req.body.from >= 0) {
			from = req.body.from
		}

		if (req.body.size !== 'undefined' && req.body.size >= 0) {
			size = req.body.size
		}

		if (req.body.filter !== 'undefined') {
			filter = req.body.filter
		}

		//get the filtered query
		const filteredQuery = getFilteredQuery(keyword, filter);
        console.log(filteredQuery);
		
		//apply the boost
		const boostedQuery = applyBoost(filteredQuery);
		
		//construct the complete query with from and size
		const data = getCompleteQuery(boostedQuery, from, size);
		
		//config the header, we only accept json data
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		//post it to GFBio elasticsearch index
	   return axios.post(PANGAEA_URL, data, config).then(resp=>{
			
			// if you receive data - send it back
			res.status(200).send(resp.data);
			
		})
		.catch(err=>{
			//in error case - log it and send the error
			console.log(err);
			return res.status(500).json({
				msg:'Error', err
			});
		});
		
	
    });

/**
 * POST /suggest
 * Suggest service
 */
 /**
   * @swagger
   * /gfbio/suggest:
   *   post:
   *     description: Returns query term suggestions for given characters
   *     tags: [Search GFBio - Elastic index]
   *     summary: returns query term suggestions
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: term
   *         description: the characters for which suggestions are needed
   *         schema:
   *            type: object
   *            required:
   *              - term
   *            properties:
   *              term:
   *                type: string
   *                example: quer
   *     responses:
   *       201:
   *         description: object with key 'suggest' containing an array with options 
   */
router.post('/suggest', (req, res) => {
    //console.log('Body:' + req.body.term);
    //get the term from the body
	const term = req.body.term

    //set the header  - only json data permitted
	const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
	//specific data object required 
    const data = {
        suggest: {
            text: term,
            completion: {
                field: 'suggest',
                size: 12
            }
        }
    }

	//post the request to elasticsearch
    return axios.post('http://ws.pangaea.de/es/dataportal-gfbio/_suggest', data, config)
	.then((resp) => {
        //console.log(`Status: ${resp.status}`);
        //console.log('Body: ', resp.data);
  		res.status(200).send(resp.data);
       
    })
    .catch((err)=> {
		  console.log(err);
		
		  return res.status(500).json({
		  msg:'Error', err
		  });
	 });
    
})


/**
 * POST /semantic-search
 * semantic search service (based on query expansion)
 * search query is sent to GFBio TS first, only expanded result is forwarded to elasticsearch
 */
 /**
   * @swagger
   * /gfbio/semantic-search:
   *   post:
   *     description: search query is sent to GFBio TS first, only expanded result is forwarded to elasticsearch
   *     tags: [Search GFBio - Elastic index]
   *     summary: returns search results including semantic related results
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: queryterm
   *         description: the query as string array
   *         schema:
   *            type: object
   *            required:
   *              - queryterm
   *            properties:
   *              queryterm:
   *                type: array
   *                items: 
   *                   type: string
   *                example: [honeybee,grassland]
   *              from:
   *                type: integer
   *                description: from which page to start?
   *                example: 0
   *              size:
   *                type: integer
   *                description: how many datasets to return per page?
   *                example: 10
   *     responses:
   *       201:
   *         description: hits.hits contains an array with dataset objects matching the query.
   */
router.post('/semantic-search',(req,res) => {

    /*e.g., 
	* {
    *	"queryterm":["grassland","honeybee"],
    * 	"from":0,
    * 	"size":10
	* }
	*/
     
	 //expects keyword as string array
    const keywords = req.body.queryterm; //array with keywords
    
    let allKeyWords = keywords;
	let axiosArray = [];
 
	//at first, send each keyword to GFBio TS
	for ( i = 0; i < keywords.length; i++) {
		//console.log("keyword: "+keywords[i]);
		axiosArray.push(axios.get(GFBioTS_URL + "search?query=" + keywords[i] + "&match_type=exact"))
	}
	 //collect all calls first and then send it in a bunch
	 //axios will handle them in parallel and will only continue when all calls are back 
	 return axios.all(axiosArray)
	 .then(axios.spread((...responses) => {
		 for ( i = 0; i < axiosArray.length; i++) {
			var results = responses[i].data.results;
                results.forEach(function (item) {
                    for (const [key, value] of Object.entries(item)) {
                        if (key === 'commonNames') {
                            allKeyWords = allKeyWords.concat(value)
                        }
                        if (key === 'synonyms') {
                            allKeyWords = allKeyWords.concat(value)
                        }
                    }
                });
		 }
		 //console.log(allKeyWords);
		 allKeyWords = allKeyWords.filter((a, b) => allKeyWords.indexOf(a) === b)
		
		 //elastic call
		 let filter = [];
		 let from = 0;
		 let size = 0;

		//check if from, size and filters are in the request
		if (req.body.from !== 'undefined' && req.body.from >= 0) {
			from = req.body.from
		}

		if (req.body.size !== 'undefined' && req.body.size >= 0) {
			size = req.body.size
		}

		if (req.body.filter !== 'undefined') {
			filter = req.body.filter
		}

		//get the filtered query
		const filteredQuery = getBooleanQuery(allKeyWords, filter);

		//apply the boost
		const boostedQuery = applyBoost(filteredQuery);
		
		//get the complete query 
		const data = getCompleteQuery(boostedQuery, from, size);
		
		//set the header - only json data accepted
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	    //console.log(data);
		
		//post the expanded query to GFBio elastic index
		return axios.post(PANGAEA_URL, data, config);
		
	 }))
	 .then(resp=>{
			//last item is necessary for highlighting the expanded terms
			resp.data.lastItem = allKeyWords;
			res.set('Content-Type', 'application/json');
			res.status(200).send(resp.data);
			
	 })
	 .catch((err)=> {
			console.log(err);
			return res.status(500).json({
				msg:'Error', err
			});
	 });
	
})


/****************** Helper function ******************************/

/*
 * Description: Add filter to a JSON query message
 * Input: String keyword : search keyword
 *        JSONArray filter : filter option (Authors, Region, Data Center)
 * Output: JSONObject : filtered query
 */
function getFilteredQuery(keyword, filterArray) {
	var queryObj;
	console.log(':: filterArray '+ JSON.stringify(filterArray));
	if (keyword != "") {
		queryObj = {
			"simple_query_string": {
				"query": keyword,
				"fields": ["fulltext", "fulltext.folded^.7", "citation^3", "citation.folded^2.1"],
				"default_operator": "and"
			}
		};
	} else {
		queryObj = {
			"match_all": {}
		};
	}
	
		
	return {
		"bool": {
			"must": queryObj,
			"filter": filterArray
		}
	};
}

function getBooleanQuery(keyword, filterArray) {

    var queryObj = {};
    var boostedKeywords = [];

    //keyword array with original term [0] and expanded terms [1] - [X]
    if (keyword.length > 0) {
        for (var i = 0; i < keyword.length; i++) {
            var booster = 1; //less priority to expanded terms
            var fields = [];
            if (i == 0) { // higher priority to original keyword
                booster = 2.2;
                fields = ["citation_title^3", "citation_title.folded^2.1",
                    "description^2.1", "description.folded",
                    "type.folded", "parameter.folded", "region.folded", "dataCenter.folded"];
                //["fulltext", "fulltext.folded^.7", "citation^3", "citation.folded^2.1"];
            } else { // extended keywords
                fields = ["citation_title^3", "citation_title.folded^2.1",
                    "description^2.1", "description.folded",
                    "parameter.folded", "region.folded", "dataCenter.folded"];
            }
            boostedKeywords.push({
                "simple_query_string": {
                    "query": keyword[i],
                    "fields": fields,
                    "default_operator": "and",
                    "boost": booster
                }
            });
        }

        queryObj = {
            "bool": {
                "should": boostedKeywords
            }
        };
    } else {
        return {"match_all": {}};
    }
    

    queryObj = {
        "bool": {
            "must": [{
                "bool": {
                    "should": boostedKeywords
                }
            }],
            "filter": filterArray
        }
    }

    return queryObj;
}


/*
 * Description: Apply boosting option to a JSON query message
 * Input: JSONObject query : JSON query message with filter option
 * Output: JSONObject : boosted query
 */
function applyBoost(query) {
    return {
        "function_score": {
            "query": query,
            "functions": [{
                "field_value_factor": {
                    "field": "boost"
                }
            }
            ],
            "score_mode": "multiply"
        }
    }
}

/*
 * Description: Complete a JSON query message with query size, query field, and facets options
 * Input: JSONObject boostedQuery : a JSON query mesage with filter and boost parameters
 *        int iDisplayStart : starting index of dataset (read from pagination option)
 *        int iDisplayLength : size of dataset (read from pagination option)
 *        JSONArray queryfield : array of query fields
 * Output: JSONObject : a complete JSON request message
 */
function getCompleteQuery(boostedQuery, iDisplayStart, iDisplayLength) {
    return {
        'query': boostedQuery,
        'highlight': {
            'fields': {'*': {}}
        },
        'from': iDisplayStart,
        'size': iDisplayLength,
        'aggs': {
            'taxonomy': {
                'terms': {
                    'field': 'taxonomyFacet',
                    'size': 50
                }
            },
            'region': {
                'terms': {
                    'field': 'regionFacet',
                    'size': 50
                }
            },
            'parameter': {
                'terms': {
                    'field': 'parameterFacet',
                    'size': 50
                }
            },
            'gfbioDataKind': {
                'terms': {
                    'field': 'gfbioDataKindFacet',
                    'size': 50
                }
            },
            'dataCenter': {
                'terms': {
                    'field': 'dataCenterFacet',
                    'size': 50
                }
            },
			'type': {
				'terms': {
					'field': 'typeFacet',
					'size': 50
            }
        }
        }
    }
}


module.exports = router;
