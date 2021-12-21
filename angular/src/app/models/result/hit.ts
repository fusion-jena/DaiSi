import {Citation} from './citation';
import {Description} from './description';
import {Linkage} from './linkage';
import {Type} from 'class-transformer';
import {UpperLabel} from './upperLabel';

// every dataset
export class Hit {
    private title: string;
    private id: string;
    private titleUrl: string;
    @Type(() => Description)
    private description: Array<Description>;
    // the colorful labels on the top of every dataset
    @Type(() => UpperLabel)
    private upperLabels: Array<UpperLabel>;
    private licence: Array<string>;
    // every dataset can contain images or videos or sound tracks
    private multimediaObjs: Array<any>;
    private vat: boolean;
    private latitude: string;
    private longitude: string;
    @Type(() => Citation)
    private citation: Citation;
    // it contains the information related to the download of the dataset
    @Type(() => Linkage)
    private linkage: Linkage;
    // it contains the information related to the download of the dataset
    private metadatalink: string;
    // it contains the information related to the download of the dataset
    private identifier: string;
    // every dataset can be shown on the map with an specific color
    private color: string;
    // most of the information of the dataset is in the xml
    private xml: string;
    // if this dataset has been selected by the user
    private checkbox: boolean;

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string): void {
        this.color = color;
    }

    getMetadatalink(): string {
        return this.metadatalink;
    }

    setMetadatalink(metadatalink: string): void {
        this.metadatalink = metadatalink;
    }

    getIdentifier(): string {
        return this.identifier;
    }

    setIdentifier(identifier: string): void {
        this.identifier = identifier;
    }

    getLinkage(): Linkage {
        return this.linkage;
    }

    setLinkage(linkage: Linkage): void {
        this.linkage = linkage;
    }

    getXml(): string {
        return this.xml;
    }

    setXml(xml: string): void {
        this.xml = xml;
    }

    getTitleUrl(): string {
        return this.titleUrl;
    }

    setTitleUrl(titleUrl: string): void {
        this.titleUrl = titleUrl;
    }

    getDescription(): Array<Description> {
        return this.description;
    }

    setDescription(description: Array<Description>): void {
        this.description = description;
    }

    getUpperLabels(): Array<UpperLabel> {
        return this.upperLabels;
    }

    setUpperLabels(upperLabels: Array<UpperLabel>): void {
        this.upperLabels = upperLabels;
    }

    getLicence(): Array<string> {
        return this.licence;
    }

    setLicence(licence: Array<string>): void {
        this.licence = licence;
    }

    getVat(): boolean {
        return this.vat;
    }

    setVat(vat: boolean): void {
        this.vat = vat;
    }

    getCitation(): Citation {
        return this.citation;
    }

    setCitation(citation: Citation): void {
        this.citation = citation;
    }

    getMultimediaObjs(): Array<any> {
        return this.multimediaObjs;
    }

    setMultimediaObjs(multimediaObjs: Array<any>): void {
        this.multimediaObjs = multimediaObjs;
    }

    getLatitude(): string {
        return this.latitude;
    }

    setLatitude(latitude: string): void {
        this.latitude = latitude;
    }

    getLongitude(): string {
        return this.longitude;
    }

    setLongitude(longitude: string): void {
        this.longitude = longitude;
    }

    getCheckBox(): boolean {
        return this.checkbox;
    }

    setCheckbox(checkbox: boolean): void {
        this.checkbox = checkbox;
    }

    coordinates(): string {
        if (this.getLatitude !== undefined && this.getLongitude() !== undefined) {
            return 'This dataset has coordinates: min latitude: ' + this.getLatitude() + ', max longitude: ' + this.getLongitude();
        } else {
            return 'This dataset has no coordinates.';
        }
    }

    transferToVat(): string {
        if (this.getVat()) {
            return 'This dataset can be transfered to VAT.';
        }
    }
}
