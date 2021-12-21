import {Injectable} from '@angular/core';
import {Result} from '../../models/result/result';
import {Hit} from '../../models/result/hit';
import {Citation} from '../../models/result/citation';
import {CommunicationService} from './communication.service';
import {Aggregation} from '../../models/result/aggregation';
import {Facet} from '../../models/result/facet';
import {Description} from '../../models/result/description';
import {Linkage} from '../../models/result/linkage';
import {UpperLabel} from '../../models/result/upperLabel';

@Injectable({
    providedIn: 'root'
})

export class GfbioPreprocessDataService {


    constructor(private communicationService: CommunicationService) {
    }

    public static dataCenter = 'Data Center';
    public static dataType = 'Data Type';
    public static parameter = 'Parameter';
    public static taxonomy = 'Taxonomy';
    public static geographicRegion = 'Geographic Region';
    public static type = 'Type';
    public static datacenterTooltips = {
        SNSB: 'This dataset is provided by Staatliche Naturwissenschaftliche ' +
            'Sammlungen Bayerns; SNSB IT Center, M;nchen (SNSB).',
        SGN: 'This dataset is provided by Senckenberg Gesellschaft f;r Naturforschung; Leibniz Institute Frankfurt (SGN).',
        BGBM: 'This dataset is provided by Botanic Garden and Botanical Museum Berlin, Freie Universit;t Berlin (BGBM).',
        MfN: 'This dataset is provided by Leibniz Institute for Research on Evolution and Biodiversity, Berlin (MfN).',
        ZFMK: 'This dataset is provided by Zoological Research Museum Alexander Koenig; Leibniz ' +
            'Institute for Animal Biodiversity, Bonn (ZFMK).',
        SMNS: 'This dataset is provided by State Museum of Natural History Stuttgart (SMNS).',
        PANGAEA: 'This dataset is provided by Data Publisher for Earth; Environmental Science  (PANGAEA).',
        DSMZ: 'This dataset is provided by Leibniz Institute DSMZ; German Collection of Microorganisms ' +
            'and Cell Cultures, Braunschweig (DSMZ).',
        Gatersleben: 'e!DAL;PGP ; Plant Genomics and Phenomics Research Data Repository, ' +
            'Leibniz Institute of Plant Genetics and Crop Plant Research (IPK) Gatersleben'
    };
    private id;

    /*maps the json which comes from the server to the Result class, it is the most important function in this service,
    other functions can be deleted according to the json response
    this method gets the json object and an array of parameters which are necessary for mapping*/
    getResult(jsonObject, parameters: Array<any>): Result {
        this.id = 10;
        const result = new Result();
        result.setSemanticKeys(jsonObject?.lastItem);
        const hits: Hit[] = this.getHits(jsonObject, parameters[0]);
        result.setHits(hits);
        result.setAggregations(this.getAggregations(jsonObject));
        result.setTotalNumber(jsonObject?.hits?.total);
        result.setOtherFilters(this.getOtherFilters());
        result.setDatePickers(this.getDatePickers());
        result.setTermData(jsonObject?.termData);
        return result;
    }

// maps the datasets
    getHits(jsonObject, semantic): Hit[] {
        const hits: Hit[] = [];
        const hitsOfObject = jsonObject?.hits?.hits;
        hitsOfObject.forEach(item => {
            hits.push(this.getHit(item, semantic));
        });
        return hits;
    }

// maps the citation data
    getCitation(item, titleURL): Citation {
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
        let dataCenter = item?.dataCenter.split(' ').pop();
        if (dataCenter === 'Science') {
            dataCenter = 'PANGAEA';
        }
        citation.setDataCenter(dataCenter);
        citation.setSource(item?.citation_source);
        citation.setCreator(creator);
        return citation;
    }

// maps the title
    getTopic(dataset, semantic): string {
        const dom = document.createRange()
            .createContextualFragment(dataset?._source?.['html-1']);
        let topic = '';
        dom?.querySelectorAll('.citation span').forEach(spanValue => {
            topic = topic + spanValue.innerHTML;
            if (spanValue.classList.contains('date')) {
                topic = topic + ': ';
            }
        });
        if (semantic) {
            const highLightTitle = dataset?.highlight?.citation_title?.[0];
            let matchTitle = highLightTitle?.replace(/<em>/g, '');
            matchTitle = matchTitle?.replace(/<\/em>/g, '');
            topic = topic?.replace(matchTitle, highLightTitle);
        }
        return topic;
    }

// maps the url title
    getTopicUrl(dom): string {
        const titleURL = dom?.querySelector('.citation a')?.getAttribute('href');
        if (titleURL === undefined || titleURL === 'undefined') {
            return 'undefined';
        } else {
            return titleURL;
        }
    }

// maps the licenses
    getLicense(dataset): [] {
        let license = dataset?._source?.licenseShort;
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
        return license;
    }

// maps a dataset
    getHit(item, semantic): Hit {
        const source = item?._source;
        const hit = new Hit();
        hit.setId(item?._id);
        const dom = document.createRange()
            .createContextualFragment(source?.['html-1']);
        hit.setTitleUrl(this.getTopicUrl(dom));
        hit.setTitle(this.getTopic(item, semantic));
        hit.setUpperLabels(this.getLabels(source));
        hit.setCitation(this.getCitation(source, this.getTopicUrl(dom)));
        hit.setLicence(this.getLicense(item));
        hit.setVat(source?.vatVisualizable);
        hit.setXml(source?.xml);
        hit.setLongitude(source?.maxLongitude);
        hit.setLatitude(source?.minLatitude);
        hit.setMetadatalink(source?.metadatalink);
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
        if (semantic) {
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
                    // linkage.setMultimedia(element.elements[0].text);
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

// maps labels
    getLabels(item): UpperLabel[] {
        const upperLabels: UpperLabel[] = [];

        if (item?.citation_date) {
            const year = new UpperLabel();
            year.setInnerInfo(item?.citation_date?.substring(0, 4));
            year.setTooltip('Publication year');
            year.setColorClass('bg-label-blue');
            upperLabels.push(year);
        }

        if (!item?.accessRestricted) {
            const access = new UpperLabel();
            access.setInnerInfo('Open Access');
            access.setTooltip('This dataset is open access. You can use primary data and metadata.');
            access.setColorClass('bg-label-green');
            upperLabels.push(access);
        }

        const dataCenter = new UpperLabel();
        dataCenter.setInnerInfo(item?.dataCenter.split(' ').pop());
        if (dataCenter.getInnerInfo() === 'Science') {
            dataCenter.setInnerInfo('PANGAEA');
        }
        switch (dataCenter.getInnerInfo()) {
            case 'SNSB':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.SNSB);
                break;
            case 'SGN':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.SGN);
                break;
            case 'BGBM':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.BGBM);
                break;
            case 'MfN':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.MfN);
                break;
            case 'ZFMK':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.ZFMK);
                break;
            case 'SMNS':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.SMNS);
                break;
            case 'PANGAEA':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.PANGAEA);
                break;
            case 'DSMZ':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.DSMZ);
                break;
            case 'Gatersleben':
                dataCenter.setTooltip(GfbioPreprocessDataService.datacenterTooltips.Gatersleben);
                break;
            default:
                dataCenter.setTooltip('Publisher');
        }
        dataCenter.setColorClass('bg-goldenrod');
        upperLabels.push(dataCenter);

        return upperLabels;
    }

// maps facets
    getAggregations(jsonObject): Aggregation[] {
        const titles = [GfbioPreprocessDataService.dataCenter,
            GfbioPreprocessDataService.dataType,
            GfbioPreprocessDataService.parameter,
            GfbioPreprocessDataService.taxonomy,
            GfbioPreprocessDataService.type,
            GfbioPreprocessDataService.geographicRegion];
        const aggregationsJson = jsonObject?.aggregations;
        const values = Object.values(aggregationsJson);
        const keys = Object.keys(aggregationsJson);
        const aggregations: Aggregation[] = [];
        // tslint:disable-next-line:forin
        for (const i in values) {
            const aggregation = new Aggregation();
            aggregation.setId(String(keys[i]));
            aggregation.setTitle(titles[i]);
            aggregation.setIcon(this.selectIcon(aggregation.getTitle()));
            const buckets: Facet[] = [];
            // @ts-ignore
            values[i].buckets.forEach(item => {
                const bucket = new Facet();
                bucket.setDocCount(item?.doc_count);
                bucket.setKey(item?.key);
                buckets.push(bucket);
            });
            aggregation.setFacets(buckets);
            aggregations.push(aggregation);

        }
        return aggregations;
    }

// maps other filters
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

// maps datepicker filters
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
