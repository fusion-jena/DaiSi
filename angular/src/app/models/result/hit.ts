import {Expose, Type} from 'class-transformer';
import {Source} from './source';
import {Highlight} from './highlight';
import {Citation} from './citation';
import {Description} from './description';

export class Hit {
    private title;
    private titleUrl;
    private description: Array<Description>;
    private dataCentre;
    private year;
    private accessType;
    private licence;
    private vat;
    private multimediaObjs;
    private latitude;
    private longitude;
    @Type(() => Citation)
    private citation;

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
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
    
    getLatitude(): string{
		return this.latitude;
	}
	setLatitude(latitude:string): void{
		this.latitude = latitude;
	}
	getLongitude(): string{
		return this.longitude;
	}
	setLongitude(longitude:string): void{
		this.longitude = longitude;
	}
	
	coordinates(): string{
		if(this.getLatitude !== undefined && this.getLongitude() !== undefined)
			return "This dataset is visualizable: min latitude: "+ this.getLatitude() + ", max longitude: "+ this.getLongitude();
		else
			return "This dataset is visualizable."
	}
}
