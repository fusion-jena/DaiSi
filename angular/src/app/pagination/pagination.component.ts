import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import {StartSearchingService} from '../services/local/start-searching.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    items = [];
    pageOfItems: Array<any>;
    counter = 2;
    entries = 0;
    isSend = false;

    constructor(private startSearchingService: StartSearchingService,
                private communicationService: CommunicationService) {
    }

    ngOnInit(): void {
        this.communicationService.getResult().subscribe(value => {
            if (value !== undefined && this.entries !== value.getTotalNumber()) {
                this.items = Array(value.getTotalNumber()).fill(0);
                this.entries = value.getTotalNumber();
            }
        });
    }

    onChangePage(pageOfItems: Array<any>): void {
        // update current page of items
        this.pageOfItems = pageOfItems;
        if (this.isSend) {
            const elements = document.querySelector('.pagination .active');
            const index = Number((elements as HTMLElement).innerText);
            const from = (index - 1) * 10;
            this.startSearching(from);
            this.isSend = false;
        }
    }

    startSearching(from): void {
        this.communicationService.setPagination(from);
        this.startSearchingService.startSearching();
    }
}
