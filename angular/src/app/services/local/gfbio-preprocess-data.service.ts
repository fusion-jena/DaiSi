import {Injectable} from '@angular/core';
import {Result} from '../../models/result/result';
import {Hit} from '../../models/result/hit';
import {Citation} from '../../models/result/citation';
import {CommunicationService} from './communication.service';
import {Aggregations} from '../../models/result/aggregations';
import {Bucket} from '../../models/result/bucket';
import {Description} from '../../models/result/description';
import {Linkage} from '../../models/result/linkage';

@Injectable({
    providedIn: 'root'
})

export class GfbioPreprocessDataService {

    public static dataCenter = 'Data Center';
    public static dataType = 'Data Type';
    public static parameter = 'Parameter';
    public static taxonomy = 'Taxonomy';
    public static geographicRegion = 'Geographic Region';
    public static type = 'Type';
    private id;


    constructor(private communicationService: CommunicationService) {
    }

    getResult(jsonObject, otherParameters: Array<any>): Result {
        this.id = 10;
        const result = new Result();
        result.setSemanticKeys(jsonObject?.lastItem);
        const hits: Hit[] = this.getHits(jsonObject, otherParameters[0]);
        result.setHits(hits);
        result.setAggregations(this.getAggregations(jsonObject));
        result.setTotalNumber(jsonObject?.hits?.total);
        result.setOtherFilters(this.getOtherFilters());
        result.setDatePickers(this.getDatePickers());
        result.setTermData(jsonObject?.termData);
        return result;
    }

    getHits(jsonObject, semantic): Hit[] {
        const hits: Hit[] = [];
        const hitsOfObject = jsonObject?.hits?.hits;
        hitsOfObject.forEach(item => {
            hits.push(this.getHit(item, semantic));
        });
        return hits;
    }

    getCitation(item, titleURL, dataCenter): Citation {
        const citation = new Citation();
        const xmlStr = item?.xml;
        const jsonResult = this.communicationService.xmltoJson(xmlStr)?.elements?.[0]?.elements;
        const creator = [];
        jsonResult.forEach(value => {
            switch (value?.name) {
                case 'dc:title': {
                    citation.setTitle(value?.elements?.[0]?.text);
                    break;
                }
                case 'dc:creator': {
                    creator.push(value?.elements?.[0]?.text);
                    break;
                }
                case 'dc:date': {
                    citation.setDate(value?.elements?.[0]?.text);
                    break;
                }
            }
        });
        citation.setDOI(titleURL);
        citation.setDataCenter(dataCenter);
        citation.setSource(item?.citation_source);
        citation.setCreator(creator);
        return citation;
    }

    getHit(item, semantic): Hit {
        const source = item?._source;
        const hit = new Hit();
        const dom = document.createRange()
            .createContextualFragment(source?.['html-1']);
        const titleURL = dom?.querySelector('.citation a')?.getAttribute('href');
        if (titleURL === undefined || titleURL === 'undefined') {
            hit.setTitleUrl('undefined');
        } else {
            hit.setTitleUrl(titleURL);
        }

        let topic = '';
        dom?.querySelectorAll('.citation span').forEach(spanValue => {
            topic = topic + spanValue.innerHTML;
            if (spanValue.classList.contains('date')) {
                topic = topic + ': ';
            }
        });
        hit.setTitle(topic);
        const tr = dom?.querySelectorAll('.desc tr');
        const description = [];
        tr.forEach(row => {
            const title = row?.querySelectorAll('td')?.[0]?.innerHTML;
            const value = row?.querySelectorAll('td')?.[1]?.innerHTML;
            if (title === 'Parameters:' || title === 'Summary:') {
                const descriptionItem = new Description();
                descriptionItem.setTitle(title);
                descriptionItem.setValue(value);
                description.push(descriptionItem);
            }
        });
        hit.setAccessType(source?.accessRestricted);
        let dataCenter = source?.dataCenter.split(' ').pop();
        if (dataCenter === 'Science') {
            dataCenter = 'PANGAEA';
        }
        hit.setDataCentre(dataCenter);
        const citation = this.getCitation(source, titleURL, dataCenter);
        hit.setCitation(citation);
        let license = source?.licenseShort;
        if (!Array.isArray(license)) {
            license = [license];
        }
        license.forEach((l, i) => {
            const allLicences = ['CC BY', 'CC BY-NC', 'CC BY-NC-ND', 'CC BY-NC-SA', 'CC BY-ND',
                'CC BY-SA', 'CC0', 'GPL', 'All rights reserved'];
            if (!allLicences.includes(l)) {
                license[i] = 'Other';
            }
        });
        hit.setLicence(license);
        hit.setVat(source?.vatVisualizable);
        hit.setXml(source?.xml);
        hit.setLongitude(source?.maxLongitude);
        hit.setLatitude(source?.minLatitude);
        hit.setMetadatalink(source?.metadatalink);
        hit.setYear(source?.citation_date?.substring(0, 4));
        if (semantic) {
            const highLightTitle = item?.highlight?.citation_title?.[0];
            let matchTitle = highLightTitle?.replace(/<em>/g, '');
            matchTitle = matchTitle?.replace(/<\/em>/g, '');
            topic = topic?.replace(matchTitle, highLightTitle);
            hit.setTitle(topic);
            const highLightDescription = item?.highlight?.description;
            if (highLightDescription !== undefined && highLightDescription.length > 0) {
                highLightDescription.forEach(entry => {
                    const entryCopy = entry;
                    entry = entry?.replace(/<em>/g, '');
                    entry = entry?.replace(/<\/em>/g, '');
                    description.forEach(row => {
                        row.value = row.value?.replace(entry, entryCopy);
                    });

                });
            }
        }
        const xml = this.communicationService.xmltoJson(source?.xml)?.elements?.[0]?.elements;
        const multimediaObjs: Array<any> = [];
        const linkage = new Linkage();
        let relation = '';
        xml.forEach(element => {
            if (element.name === 'dc:identifier') {
                hit.setIdentifier(element.elements[0].text);
            }
            if (element.name === 'linkage') {
                if (element.attributes.type === 'multimedia') {
                    //linkage.setMultimedia(element.elements[0].text);
                    const text = element.elements[0].text;
                    const differentTypes = [['.mp3', 'sound'], ['.mp4', 'video'],
                        ['.jpg', 'picture'], ['.tiff', 'picture'],
                        ['.png', 'picture'], ['.wav', 'sound']];
                    differentTypes.forEach(types => {
                        if (text.includes(types[0])) {
                            const multimediaObj = {
                                type: types[1],
                                url: text
                            };
                            multimediaObjs.push(multimediaObj);
                        }
                    });
                    linkage.setMultimedia(multimediaObjs);
                }

                if (element.attributes.type === 'metadata') {
                    linkage.setMetadata(element.elements[0].text);
                }
                if (element.attributes.type === 'data') {
                    linkage.setData(element.elements[0].text);
                }

            }
            if (element.name === 'dc:relation') {
                let value = element.elements[0].text;
                if (value.startsWith('http')) {
                    value = '<a ' + 'href = "' + value + '" >' + value + '</a>';
                }
                relation = relation + '<li>' + value + '</li>';
            }
        });
        if (relation !== '') {
            const descriptionItem = new Description();
            descriptionItem.setTitle('Relation:');
            descriptionItem.setValue('<ul>' + relation + '</ul>');
            description.push(descriptionItem);
        }
        hit.setLinkage(linkage);
        hit.setDescription(description);
        hit.setMultimediaObjs(multimediaObjs);
        const colors = ['#94e851', '#f52f57', '#173b4e', '#ee82ee', '#ffff00', '#27408b', '#009acd', '#ff00ff', '#8b0000', '#00fa9a'];
        hit.setColor(colors[this.id - 1]);
        this.id = this.id - 1;
        return hit;
    }

    getAggregations(jsonObject): Aggregations[] {
        const titles = [GfbioPreprocessDataService.dataCenter,
            GfbioPreprocessDataService.dataType,
            GfbioPreprocessDataService.parameter,
            GfbioPreprocessDataService.taxonomy,
            GfbioPreprocessDataService.type,
            GfbioPreprocessDataService.geographicRegion];
        const aggregationsJson = jsonObject?.aggregations;
        const values = Object.values(aggregationsJson);
        const keys = Object.keys(aggregationsJson);
        const aggregations: Aggregations[] = [];
        // tslint:disable-next-line:forin
        for (const i in values) {
            const aggregation = new Aggregations();
            aggregation.setName(String(keys[i]));
            aggregation.setTitle(titles[i]);
            aggregation.setIcon(this.selectIcon(aggregation.getTitle()));
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
                icon: 'map',
                title: 'Visualizable in VAT',
                parameters: [{label: 'Visualizable in VAT', parameterType: 'vatVisualizable', parameterValue: true, id: 'vatVisualizable'}]
            },
            {
                icon: 'lock_outline',
                title: 'Access',
                parameters: [{
                    label: 'access is restricted', parameterType: 'accessRestricted', parameterValue: true,
                    id: 'accessRestricted'
                }
                    , {label: 'open access only', parameterType: 'accessRestricted', parameterValue: false, id: 'accessOpen'}
                ]
            },
            {
                icon: 'image',
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
                icon: 'date_range',
                title: 'Collection Date',
                type: 'collection',
                inputs: [
                    {id: 'collectionStart', name: 'Collection start date', type: 'start date'},
                    {id: 'collectionEnd', name: 'Collection end date', type: 'end date'}
                ]
            },
            {
                icon: 'date_range',
                title: 'Publication Date',
                type: 'publication',
                inputs: [
                    {id: 'publicationStart', name: 'Publication start date', type: 'start date'},
                    {id: 'publicationEnd', name: 'Publication end date', type: 'end date'}
                ]
            }
        ];

    }

    // available icons: https://jossef.github.io/material-design-icons-iconfont/
    selectIcon(filter): string {

        // default icon
        let icon = 'filter_list';
        switch (filter) {
            case GfbioPreprocessDataService.dataCenter: {
                icon = 'storage';
                break;
            }
            case GfbioPreprocessDataService.dataType: {
                icon = 'domain';
                break;
            }
            case GfbioPreprocessDataService.geographicRegion: {
                icon = 'location_on';
                break;
            }
            case GfbioPreprocessDataService.taxonomy: {
                icon = 'account_tree';
                break;
            }
            case GfbioPreprocessDataService.parameter: {
                icon = 'table_view';
                break;
            }
            case GfbioPreprocessDataService.type: {
                icon = 'auto_awesome_motion';
                break;
            }
        }
        return icon;
    }
}
