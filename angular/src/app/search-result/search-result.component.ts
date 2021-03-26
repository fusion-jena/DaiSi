import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import {Result} from '../models/result/result';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnChanges {
    semantic: boolean;
    @Input() result = new Result();
    listOfCheckBox = [];
    @Output() basket = new EventEmitter<any>();
    @Output() from = new EventEmitter<any>();

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
            this.listOfCheckBox = [];
    }

    checkBox(item): void {
        this.listOfCheckBox.forEach((dataItem) => {
            if (dataItem.key === item.key) {
                this.listOfCheckBox.splice(this.listOfCheckBox.indexOf(dataItem), 1);
            }
        });
        this.listOfCheckBox.push(item);
        console.log(this.listOfCheckBox);
        this.basket.emit(this.listOfCheckBox);
    }

    paginationClicked(from): void {
        this.from.emit(from);
    }
}
