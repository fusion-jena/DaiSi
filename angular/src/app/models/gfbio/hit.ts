import {Expose, Type} from 'class-transformer';
import {Source} from './source';
import {Highlight} from './highlight';
import {Citation} from './citation';

export class Hit {
    private title;
    private html;
    private highLightTitle;
    private highLightDescription;
    private description;
    private dataCentre;
    private year;
    private accessType;
    private licence;
    private vat;
    private multimediaObjs;
    @Type(() => Citation)
    private citation;

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }
    getHighLightTitle(): string {
        return this.highLightTitle;
    }

    setHighLightTitle(highLightTitle: string): void {
        this.highLightTitle = highLightTitle;
    }
    getHighLightDescription(): string {
        return this.highLightDescription;
    }

    setHighLightDescription(highLightDescription: string): void {
        this.highLightDescription = highLightDescription;
    }
    getHtml(): string {
        return this.html;
    }

    setHtml(html: string): void {
        this.html = html;
    }
    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = description;
    }
    getDataCentre(): string {
        return this.dataCentre;
    }

    setDataCentre(dataCentre: string): void {
        this.dataCentre = dataCentre;
    }
    getYear(): string {
        return this.year;
    }

    setYear(year: string): void {
        this.year = year;
    }
    getAccessType(): boolean {
        return this.accessType;
    }

    setAccessType(accessType: boolean): void {
        this.accessType = accessType;
    }
    getLicence(): string {
        return this.licence;
    }

    setLicence(licence: string): void {
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
}
