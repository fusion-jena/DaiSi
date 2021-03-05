import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../services/local/communication.service';
import {MatDialog} from '@angular/material/dialog';
import {CitationComponent} from '../citation/citation.component';
import {faQuoteLeft} from '@fortawesome/free-solid-svg-icons';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {faVideo} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {DomSanitizer} from '@angular/platform-browser';
import {Result} from '../models/gfbio/result';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
    faQuoteLeft = faQuoteLeft;
    semantic: boolean;
    faVolumeUp = faVolumeUp;
    faVideo = faVideo;
    faImage = faImage;
    result = new Result();

    constructor(private communicationService: CommunicationService, public dialog: MatDialog,
                private sanitizer: DomSanitizer) {
    }

    // it listens to the result that will come from the communication service (search-input)
    ngOnInit(): void {
        this.communicationService.getResult().subscribe(value => {
            this.semantic = this.communicationService.getIsSemantic();
            if (value !== undefined) {
                this.result = value;
            }
        });
    }

    openDialog(i): void {

        this.communicationService.setCitation(i);
        const dialogRef = this.dialog.open(CitationComponent);
    }

    sanitize(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
