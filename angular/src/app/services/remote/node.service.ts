import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommunicationService} from '../local/communication.service';
import {Result} from '../../models/result/result';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NodeService {
    url = environment.apiUrl;
    suggestPanUrl = environment.context + environment.suggestPanUrl;
    suggestTerUrl = environment.context + environment.suggestTerUrl;
    basketURL = environment.context + environment.basketUrl;
    addToBasketUrl = environment.context + environment.addToBasketUrl;
    deleteFromBasketUrl = environment.context + environment.deleteFromBasket;
    deleteAllBasketUrl = environment.context + environment.deleteAllBasket;
    readFromBasketUrl = environment.context + environment.readFromBasketUrl;
    semantic = false;
    headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};

    constructor(private http: HttpClient, private spinner: NgxSpinnerService,
                private communicationService: CommunicationService) {
    }

    search(urlTerm, body, serviceType, otherParameters: Array<any>): any {
        // console.log(body);
        this.spinner.show();
        const headers = this.headers;
        this.http.post<any>(this.url + urlTerm, body, {headers}).subscribe(data => {
            let results: Result;
            results = serviceType.getResult(data, otherParameters);
            this.communicationService.setResult(results);
            // console.log(results);
            // console.log(data);
            this.spinner.hide();
        }, err => {
            alert(environment.textAlertSemSearchError);
            this.spinner.hide();
        });
    }

    suggestSimple(key): any {
        const body = {
            term: key
        };
        const headers = this.headers;
        return this.http.post<any>(this.url + this.suggestPanUrl, body, {headers});
    }

    suggestTerminology(key): any {
        const body = {
            term: key
        };
        const headers = this.headers;
        return this.http.post<any>(this.url + this.suggestTerUrl, body, {headers});
    }

    addToBasket(itemInDatabase): any {
        return this.http.post<any>(this.url + this.addToBasketUrl, itemInDatabase);
    }

    readFromBasket(userId): any {
        return this.http.get<any>(this.url + this.readFromBasketUrl + userId);
    }

    deleteFromBasket(itemInDatabase): any {
        return this.http.post<any>(this.url + this.deleteFromBasketUrl, itemInDatabase);
    }

    deleteAllBasket(userId): any {
        return this.http.post<any>(this.url + this.deleteAllBasketUrl, {userId});
    }

    basketDownload(baskets): any {
        return this.http.post(this.url + this.basketURL, baskets, {responseType: 'blob'});
    }

    narrow(id, uri): any {
        const body = {
            id,
            uri
        };
        const headers = this.headers;
        return this.http.post<any>(this.url + '/gfbio/narrow', body, {headers});
    }

    broad(id, uri): any {
        const body = {
            id,
            uri
        };
        const headers = this.headers;
        return this.http.post<any>(this.url + '/gfbio/broad', body, {headers});
    }
}
