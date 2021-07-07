import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommunicationService} from '../local/communication.service';
import {Result} from '../../models/result/result';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NodeService {
    url = environment.apiUrl;
	suggestURL = environment.context + environment.suggestUrl;
	basketURL = environment.context+ environment.basketUrl;
    semantic = false;

    constructor(private http: HttpClient, private spinner: NgxSpinnerService,
                private communicationService: CommunicationService) {
    }

    search(urlTerm, body, serviceType, otherParameters: Array<any>): any {
        this.spinner.show();
        const headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};
        this.http.post<any>(this.url + urlTerm, body, {headers}).subscribe(data => {
            console.log(this.url + urlTerm);
            console.log(body);
            console.log(data);
            let results: Result;
            results = serviceType.getResult(data, otherParameters);
            this.communicationService.setResult(results);
            this.spinner.hide();
        });
    }

    suggest(key): any {
        const body = {
            term: key
        };
        const headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};
        return this.http.post<any>(this.url + this.suggestURL, body, {headers});
    }

    basket(baskets): any {
        const headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};
        return this.http.post(this.url + this.basketURL, baskets, {responseType: 'blob'});
    }
}
