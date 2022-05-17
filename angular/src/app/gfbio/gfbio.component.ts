import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import {Result} from '../models/result/result';
import {StartSearchingService} from '../services/local/start-searching.service';
import {SearchResult} from '../interface/search-result';
import {Filters} from '../interface/filters';
import {SearchInput} from '../interface/search-input';

@Component({
    selector: 'app-gfbio',
    templateUrl: './gfbio.component.html',
    styleUrls: ['./gfbio.component.css']
})
export class GfbioComponent implements OnInit, SearchResult, Filters, SearchInput {
    semantic = false;
    resetFilters = true;
    result: Result;
    searchKey = [];
    from = 0;
    filters;
    markers;

    constructor(private communicationService: CommunicationService,
                private startSearchingService: StartSearchingService) {
    }

    ngOnInit(): void {
        this.startSearching();
        this.communicationService.getResult().subscribe(value => {
            if (value !== undefined) {
                this.result = value;
            }
        });
    }

    mapItems(items): void {
        this.markers = {items};
    }

    paginationClicked(from): void {
        this.resetFilters = false;
        this.from = from;
        this.startSearching();
    }

    searchKeySubmitted(key): void {
        this.resetFilters = true;
        this.searchKey = key[0];
        this.semantic = key[1];
        this.from = 0;
        this.filters = [];
        this.startSearching();
    }

    filterSubmitted(filters): void {
        this.resetFilters = false;
        this.filters = filters;
        this.from = 0;
        this.startSearching();
    }

    startSearching(): void {
        this.startSearchingService.startSearching(this.searchKey, this.semantic, this.from, this.filters);
    }
}
