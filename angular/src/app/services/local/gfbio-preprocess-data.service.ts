import {Injectable} from '@angular/core';
import {Result} from '../../models/gfbio/result';
import {Hit} from '../../models/gfbio/hit';
import {Citation} from '../../models/gfbio/citation';
import {CommunicationService} from './communication.service';
import {Aggregations} from '../../models/gfbio/aggregations';
import {Bucket} from '../../models/gfbio/bucket';

@Injectable({
    providedIn: 'root'
})
export class GfbioPreprocessDataService {

    constructor(private communicationService: CommunicationService) {
    }

    getResult(jsonObject): Result {
        const result = new Result();
        result.setSemanticKeys(jsonObject?.lastItem);
        const hits: Hit[] = this.getHits(jsonObject);
        result.setHits(hits);
        result.setAggregations(this.getAggregations(jsonObject));
        result.setTotalNumber(jsonObject?.hits?.total);
        result.setOtherFilters(this.getOtherFilters());
        result.setDatePickers(this.getDatePickers());
        return result;
    }

    getHits(jsonObject): Hit[] {
        const hits: Hit[] = [];
        const hitsOfObject = jsonObject?.hits?.hits;
        hitsOfObject.forEach(item => {
            hits.push(this.getHit(item));
        });
        return hits;
    }

    getCitation(item): Citation {
        const citation = new Citation();
        if (String(item?.citation_publisher) === 'PANGAEA') {
            const xmlStr = item?.xml;
            const jsonResult = this.communicationService.xmltoJson(xmlStr)?.elements?.[0]?.elements;
            jsonResult.forEach(value => {
                switch (value?.name) {
                    case 'dc:title': {
                        citation.setTitle(value?.elements?.[0]?.text);
                        break;
                    }
                    case 'dc:creator': {
                        citation.setCreator(value?.elements?.[0]?.text);
                        break;
                    }
                    case 'dc:date': {
                        citation.setDate(value?.elements?.[0]?.text);
                        break;
                    }
                }
            });
        } else {
            citation.setSource(item?.citation_source);
        }
        return citation;
    }

    getHit(item): Hit {
        const source = item?._source;
        const hit = new Hit();
        const citation = this.getCitation(source);
        hit.setCitation(citation);
        hit.setTitle(source?.citation_title);
        hit.setAccessType(source?.accessRestricted);
        let dataCenter = source?.dataCenter.split(' ').pop();
        if (dataCenter === 'Science') {
            dataCenter = 'PANGAEA';
        }
        hit.setDataCentre(dataCenter);
        hit.setDescription(source?.description);
        hit.setLicence(source?.licenseShort);
        const allLicences = ['CC BY', 'CC BY-NC', 'CC BY-NC-ND', 'CC BY-NC-SA', 'CC BY-ND', 'CC BY-SA', 'CC0', 'GPL'];
        if (!allLicences.includes(source?.licenseShort)) {
            hit.setLicence('no licence');
        }
        hit.setVat(source?.vatVisualizable);
        hit.setYear(source?.citation_date?.substring(0, 4));
        hit.setHtml(source?.['html-1']);
        if (this.communicationService.getIsSemantic()){
            let html = source?.['html-1'];
            const title = html.substring(
                html.lastIndexOf('<span class=\"title\">') + 20,
                html.lastIndexOf('</span>')
            );
            const description = html.substring(
                html.lastIndexOf('<table class=\"desc\">') + 20,
                html.lastIndexOf('</table>')
            );
            const highLightTitle = item?.highlight?.citation_title?.[0];
            html = html.replace(title, highLightTitle);
            const highLightDescription = item?.highlight?.description;
            if (highLightDescription !== undefined) {
                html = html.replace(description, highLightDescription);
            }
            hit.setHtml(html);
        }
        const xml = this.communicationService.xmltoJson(source?.xml)?.elements?.[0]?.elements;
        xml.forEach(element => {
            if (element.name === 'additionalContent') {
                const multimediaObjs: Array<any> = [];
                const text = element.elements[0].text;
                const differentTypes = [['.mp3', 'sound'], ['.mp4', 'video'],
                    ['.jpg', 'picture'], ['.tiff', 'picture'],
                    ['.png', 'picture'], ['.wav', 'sound']];
                differentTypes.forEach(types => {
                    if (text.includes(types[0])) {
                        const multimediaObj = {
                            type: types[1],
                            url: this.multimediaFunc(text, types[0])
                        };
                        multimediaObjs.push(multimediaObj);
                    }
                });
                hit.setMultimediaObjs(multimediaObjs);
            }
        });
        return hit;
    }
    multimediaFunc(text, obj): any {
        let item;
        let url = text.match('http(.*)' + obj);
        url = url[0].split(',');
        url.forEach(element => {
            if (element.includes(obj)) {
                item = element;
            }
        });
        return item;
    }
    getAggregations(jsonObject): Aggregations[] {
        const titles = ['Data Center', 'Data Type', 'Parameter', 'Taxonomy', 'Type', 'Geographic Region'];
        const aggregationsJson = jsonObject?.aggregations;
        const values = Object.values(aggregationsJson);
        const keys = Object.keys(aggregationsJson);
        const aggregations: Aggregations[] = [];
        // tslint:disable-next-line:forin
        for (const i in values) {
            const aggregation = new Aggregations();
            aggregation.setName(String(keys[i]));
            aggregation.setTitle(titles[i]);
            const buckets: Bucket[] = [];
            // @ts-ignore
            values[i].buckets.forEach(item => {
                const bucket = new Bucket();
                bucket.setDocCount(item?.doc_count);
                bucket.setKey(item?.key);
                buckets.push(bucket);
            });
            aggregation.setBuckets(buckets);
            aggregations.push(aggregation);

        }
        return aggregations;
    }

    getOtherFilters(): Array<any> {
        return [
            {
                title: 'Visualizable in VAT',
                parameters: [{label: 'Visualizable in VAT', parameterType: 'vatVisualizable', parameterValue: true, id: 'vatVisualizable'}]
            },
            {
                title: 'Access',
                parameters: [{
                    label: 'access is restricted', parameterType: 'accessRestricted', parameterValue: true,
                    id: 'accessRestricted'
                }
                    , {label: 'open access only', parameterType: 'accessRestricted', parameterValue: false, id: 'accessOpen'}
                ]
            },
            {
                title: 'Multimedia Object',
                parameters: [{
                    label: 'images, videos, sound files', parameterType: 'parameterFacet', parameterValue: 'Multimedia Object',
                    id: 'Multimedia'
                }]
            }
        ];
    }

    getDatePickers(): Array<any> {
        return [
            {
                title: 'Collection Date',
                type: 'collection',
                inputs: [
                    {id: 'collectionStart', name: 'Collection start date', type: 'start date'},
                    {id: 'collectionEnd', name: 'Collection end date', type: 'end date'}
                ]
            },
            {
                title: 'Publication Date',
                type: 'publication',
                inputs: [
                    {id: 'publicationStart', name: 'Publication start date', type: 'start date'},
                    {id: 'publicationEnd', name: 'Publication end date', type: 'end date'}
                ]
            }
        ];

    }
}
