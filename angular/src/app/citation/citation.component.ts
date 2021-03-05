import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import {Result} from '../models/gfbio/result';
import {Citation} from '../models/gfbio/citation';
@Component({
    selector: 'app-citation',
    templateUrl: './citation.component.html',
    styleUrls: ['./citation.component.css']
})
export class CitationComponent implements OnInit {
    result: Citation;

    constructor(private communicationService: CommunicationService) {
    }
    ngOnInit(): void {
        let results: Result;
        this.communicationService.getResult().subscribe(value => {
            results = value;
        });
        this.communicationService.getCitation().subscribe(value => {
            if (results !== undefined) {
                this.result = results.getHits()[value].getCitation();
            }
        });
    }
}
