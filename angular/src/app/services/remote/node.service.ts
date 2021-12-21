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
    suggestURL = environment.context + environment.suggestUrl;
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
        this.spinner.show();
        const headers = this.headers;
        this.http.post<any>(this.url + urlTerm, body, {headers}).subscribe(data => {
            let results: Result;
            results = serviceType.getResult(data, otherParameters);
            this.communicationService.setResult(results);
            this.spinner.hide();
        }, err => {
            alert(environment.textAlertSemSearchError);
            this.spinner.hide();
        });
    }

    suggest(key): any {
        const body = {
            term: key
        };
        const headers = this.headers;
        return this.http.post<any>(this.url + this.suggestURL, body, {headers});
    }

    addToBasket(itemInDatabase): any {
        const headers = this.headers;
        return this.http.post<any>(this.url + this.addToBasketUrl, itemInDatabase, {headers});
    }

    readFromBasket(userId): any {
        const headers = this.headers;
        return this.http.get<any>(this.url + this.readFromBasketUrl + userId, {headers});
    }

    deleteFromBasket(itemInDatabase): any {
        const headers = this.headers;
        return this.http.post<any>(this.url + this.deleteFromBasketUrl, itemInDatabase, {headers});
    }

    deleteAllBasket(userId): any {
        const headers = this.headers;
        return this.http.post<any>(this.url + this.deleteAllBasketUrl, {userId}, {headers});
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
