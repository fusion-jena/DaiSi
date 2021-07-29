import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NodeService} from '../services/remote/node.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-basket-dialog',
    templateUrl: './basket-dialog.component.html',
    styleUrls: ['./basket-dialog.component.css']
})
export class BasketDialogComponent implements OnInit {
    // text for mouseover
    textTooltipBasketVATvisualizable = environment.textTooltipBasketVATvisualizable;
    textTooltipBasketVATnotVisualizable = environment.textTooltipBasketVATnotVisualizable;
    textTooltipBasketDataAvailable = environment.textTooltipBasketDataAvailable;
    textTooltipBasketDataNotAvailable = environment.textTooltipBasketDataNotAvailable;
    textTooltipBasketMetadataAvailable = environment.textTooltipBasketMetadataAvailable;
    textTooltipBasketMetadataNotAvailable = environment.textTooltipBasketMetadataNotAvailable;
    textTooltipBasketMultimediaAvailable = environment.textTooltipBasketMultimediaAvailable;
    textTooltipBasketMultimediaNotAvailable = environment.textTooltipBasketMultimediaNotAvailable;
    textTooltipBasketRemove = environment.textTooltipBasketRemove;
    textTooltipBasketEmpty = environment.textTooltipBasketEmpty;
    spinner = false;

    constructor(
        public dialogRef: MatDialogRef<BasketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data, private nodeService: NodeService) {
    }

    ngOnInit(): void {

    }

    remove(item): void {
        const index = this.data.indexOf(item);

        if (index >= 0) {
            this.data.splice(index, 1);
        }
    }

    downloadZip(): void {
        this.spinner = true;
        const basket = {
            basket: this.data
        };
        this.nodeService.basket(basket).subscribe(data => this.downloadSuccess(data),
            err => alert(environment.textAlertBasketErrorDownload));

    }

    downloadSuccess(blob): void {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.spinner = false;
    }
    emptyBasket(): void {
        this.data.splice(0, this.data.length);
    }
}
