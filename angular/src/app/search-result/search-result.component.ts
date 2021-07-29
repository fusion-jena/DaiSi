import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Result} from '../models/result/result';
import {BasketDialogComponent} from '../basket-dialog/basket-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent{
    semantic: boolean;
    @Input() result = new Result();
    basketValues = [];
    @Output() from = new EventEmitter<any>();
    @Output() mapItem = new EventEmitter<any>();

    popoverVisible = '';

    constructor(public dialog: MatDialog) {
    }

    checkBox(item): void {
        if (item.getCheckBox()) {
            this.basketValues.push(item);
        } else {
            const index = this.basketValues.indexOf(item);
            this.basketValues.splice(index, 1);
        }
        this.mapItem.emit(this.basketValues);
    }

    basketClick(): void {
        const dialogRef = this.dialog.open(BasketDialogComponent, {
            data: this.basketValues,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            this.result.getHits().forEach(value => {
                const index = result.indexOf(value);
                if (index <= -1) {
                    value.setCheckbox(false);
                }
            });
            this.mapItem.emit(this.basketValues);
        });
    }

    paginationClicked(from): void {
        this.from.emit(from);
    }
}
