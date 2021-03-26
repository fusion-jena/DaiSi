import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Result} from '../../models/result/result';


@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    private filter: Array<any> = [];
    private suggest: BehaviorSubject<any>;
    private searchKey: any;
    private urlIndex = '/gfbio';
    private IsSearchKey: BehaviorSubject<boolean>;
    private IsSemantic: boolean;
    private pagination: number;
    private result: BehaviorSubject<Result>;
    private citation: BehaviorSubject<any>;
    private removedFilter: BehaviorSubject<any>;

    constructor() {
        // @ts-ignore
        this.suggest = new BehaviorSubject<any>();
        // @ts-ignore
        this.searchKey = new BehaviorSubject<any>();
        // @ts-ignore
        this.result = new BehaviorSubject<any>();
        // @ts-ignore
        this.citation = new BehaviorSubject<any>();
        // @ts-ignore
        this.removedFilter = new BehaviorSubject<any>();
        // @ts-ignore
        this.IsSearchKey = new BehaviorSubject<any>();
    }
    setSuggest(suggest: string): void {
        this.suggest.next(suggest);
    }

    getSuggest(): Observable<string> {
        return this.suggest.asObservable();
    }
    setIsSearchKey(IsSearchKey: boolean): void {
        this.IsSearchKey.next(IsSearchKey);
    }
    getIsSearchKey(): Observable<boolean> {
        return this.IsSearchKey.asObservable();
    }
    setIsSemantic(IsSemantic: boolean): void {
        this.IsSemantic = IsSemantic;
    }
    getIsSemantic(): boolean {
        return this.IsSemantic;
    }
    setPagination(key: number): void {
        this.pagination = key;
    }
    getPagination(): number {
        return this.pagination;
    }
    setUrlIndex(key: string): void {
        this.urlIndex = key;
    }
    getUrlIndex(): string {
        return this.urlIndex;
    }
    setSearchKey(key: any): void {
        this.searchKey = key;
    }
    getSearchKey(): any {
        return this.searchKey;
    }
    setFilter(key: Array<any>): void {
        this.filter = key;
    }

    getFilter(): Array<any> {
        return this.filter;
    }

    setResult(key: Result): void {
        this.result.next(key);
    }

    getResult(): Observable<Result> {
        return this.result;
    }
    setCitation(key: number): void {
        this.citation.next(key);
    }

    getCitation(): Observable<number> {
        return this.citation;
    }
    setRemovedFilter(key: any): void {
        this.removedFilter.next(key);
    }

    getRemovedFilter(): Observable<any> {
        return this.removedFilter;
    }
    xmltoJson(xmlStr): any{
        // @ts-ignore
        const convert = require('xml-js');
        let xml =
            '<?xml version="1.0" encoding="utf-8"?>' +
            xmlStr;
        xml = convert.xml2json(xml, {compact: false, spaces: 4});
        return JSON.parse(xml);
    }
}
