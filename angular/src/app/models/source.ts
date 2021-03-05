import {Expose} from 'class-transformer';

export class Source {
    @Expose({name: 'citation_title'})
    private citationTitle: string;
    @Expose({name: 'html-1'})
    private html: string;
    @Expose({name: 'citation_publisher'})
    private citationPublisher: string;
    private description: string;
    @Expose({name: 'citation_date'})
    private citationDate: string;
    private licenseShort: string;
    private xml: string;
    private minLongitude: number;
    @Expose({name: 'citation_source'})
    private citationSource: string;
    private dataCenter: string;
    private maxLongitude: number;
    private minLatitude: number;
    private maxLatitude: number;
    private accessRestricted: boolean;
    private vatVisualizable: boolean;

    getCitationTitle(): string {
        return this.citationTitle;
    }

    getHtml(): string {
        return this.html;
    }

    setHtml(text: string): void{
        this.html = text;
    }

    getCitationPublisher(): string {
        return this.citationPublisher;
    }
    getCitationDate(): string {
        return this.citationDate;
    }

    getDescription(): string {
        return this.description;
    }

    geLicenseShort(): string {
        return this.licenseShort;
    }

    getXml(): string {
        return this.xml;
    }

    getMinLongitude(): number {
        return this.minLongitude;
    }

    getCitationSource(): string {
        return this.citationSource;
    }

    getDataCenter(): string {
        return this.dataCenter;
    }

    getMaxLongitude(): number {
        return this.maxLongitude;
    }

    getMinLatitude(): number {
        return this.minLatitude;
    }

    getMaxLatitude(): number {
        return this.maxLatitude;
    }

    getAccessRestricted(): boolean {
        return this.accessRestricted;
    }

    getVatVisualizable(): boolean {
        return this.vatVisualizable;
    }

}
