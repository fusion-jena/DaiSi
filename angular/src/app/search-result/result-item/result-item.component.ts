import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {faVideo} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {CitationComponent} from '../../citation/citation.component';
import {CommunicationService} from '../../services/local/communication.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {Hit} from '../../models/result/hit';
import {ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ResultItemComponent implements OnInit {
    @Input() item: Hit;
    @Input() itemId;
    faVolumeUp = faVolumeUp;
    faVideo = faVideo;
    faImage = faImage;
    faQuoteLeft = faQuoteLeft;

    vatImg: string = environment.imagePath + environment.vatImg;
    imagePath: string = environment.imagePath;

    @Output() checkBoxItem = new EventEmitter<any>();

    constructor(private communicationService: CommunicationService, private sanitizer: DomSanitizer, public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    openDialog(i): void {

        this.communicationService.setCitation(i);
        const dialogRef = this.dialog.open(CitationComponent, {
            data: this.item
        });
    }

    sanitize(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    checkBox(key, value): void {
        this.item.setCheckbox(value.checked);
        this.checkBoxItem.emit(this.item);
    }
}
