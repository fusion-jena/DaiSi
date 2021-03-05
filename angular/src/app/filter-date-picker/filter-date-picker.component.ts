import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import * as _moment from 'moment';

@Component({
    selector: 'app-filter-date-picker',
    templateUrl: './filter-date-picker.component.html',
    styleUrls: ['./filter-date-picker.component.css']
})
export class FilterDatePickerComponent implements OnInit {
    @Input() datePicker;
    @Input() filters;
    @Input() filterValues;
    @Output() chosenDate = new EventEmitter<any>();
    start;
    startFormat;
    end;
    endFormat;

    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit(): void {
        // tslint:disable-next-line:forin
        for (const i in this.filterValues){
            this.datePicker.inputs.forEach((input) => {
                if (this.filterValues[i] === input.name) {
                    const value = Object.values(Object.values(this.filters[i].range)[0])[0];
                    const key = Object.keys(Object.values(this.filters[i].range)[0])[0];
                    if (key === 'gte'){
                        this.start = new Date(value);
                    }
                    if (key === 'lte'){
                        this.end = new Date(value);
                    }
                }
            });
        }
        // this.filterValues.forEach((filter) => {
        //     this.datePicker.inputs.forEach((input) => {
        //         if (filter === input.name) {
        //             const relatedFilter = this.filters[]
        //         }
        //     });
        //     const type = value.split(' ')[0].toLowerCase();
        //     if (this.datePicker.type === type) {
        //         this.start = true;
        //     }
        // });
        // this.communicationService.getRemovedFilter().subscribe(filter => {
        //     if (filter !== undefined) {
        //         filter.forEach((value) => {
        //             if (value === this.datePicker.inputs[0].name) {
        //                 this.start = undefined;
        //                 this.startFormat = undefined;
        //             }
        //             if (value === this.datePicker.inputs[1].name) {
        //                 this.end = undefined;
        //                 this.endFormat = undefined;
        //             }
        //         });
        //     }
        // });
    }

    setDate(dateValue, type): void {
        let date = dateValue.value;
        const moment = _moment;
        if (this.datePicker.type === 'collection') {
            const str = moment(date).format();
            const lastIndex = str.lastIndexOf('+');
            date = str.substring(0, lastIndex);
        } else {
            date = moment(date).format('YYYY');
        }
        if (type === 'start') {
            this.startFormat = date;
        } else {
            this.endFormat = date;
        }
    }

    applyDate(): void {
        const typeAndValues = [this.startFormat, this.endFormat];
        this.chosenDate.emit(typeAndValues);
    }
}
