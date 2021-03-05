import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommunicationService} from '../local/communication.service';
import {GfbioPreprocessDataService} from '../local/gfbio-preprocess-data.service';
import {Result} from '../../models/gfbio/result';

@Injectable({
    providedIn: 'root'
})
export class NodeService {
    url = 'http://localhost:3000';
    semantic = false;

    constructor(private http: HttpClient, private spinner: NgxSpinnerService,
                private communicationService: CommunicationService,
                private gfbioPreprocessData: GfbioPreprocessDataService
               
				) {
    }

    search(key, index, filters): any {
        this.spinner.show();
        let body: any;
        let urlTerm: string;
        const headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};
        const urlIndex = '/gfbio';
        if (this.communicationService.getIsSemantic() === true) {
            key = key.split(' ');

            urlTerm = '/semantic-search';
        } else {
            urlTerm = '/search';
        }
        body = JSON.stringify({queryterm: key, from: index, size: 10, filter: filters});
        console.log(body);
        this.http.post<any>(this.url + urlIndex + urlTerm, body, {headers}).subscribe(data => {
            console.log(data);
            let results: Result;
            results = this.gfbioPreprocessData.getResult(data);
            this.communicationService.setResult(results);
            this.spinner.hide();
        });
    }

    suggest(key): any {
        const body = {
            term: key
        };
        const headers: { 'Content-Type': string } = {'Content-Type': 'application/json'};
        return this.http.post<any>(this.url + '/gfbio/suggest', body, {headers});
    }
}
