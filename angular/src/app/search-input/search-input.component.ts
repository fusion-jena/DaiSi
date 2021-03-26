import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeService} from '../services/remote/node.service';
import {CommunicationService} from '../services/local/communication.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {StartSearchingService} from '../services/local/start-searching.service';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent{
    faSearch = faSearch;
    searchKey: any;
    @Output() searchKeyEmmit = new EventEmitter<any>();
    result: any;
    windowSuggestion = false;
    semanticValue: boolean;
    @Input() checkBoxValues;
    @Output() basketChecked = new EventEmitter<any>();

    constructor(private nodeService: NodeService,
                private startSearchingService: StartSearchingService,
                private communicationService: CommunicationService) {
    }

    onWindowSuggestKey(value): void{
        if (value !== undefined) {
            (document.getElementById('searchField') as HTMLInputElement).value = value;
            this.searchKey = value;
            this.startSearching(this.semanticValue);
            this.windowSuggestion = false;
        }
    }

    // by clicking on the submit button, this method will be called
    onSearch(): void {
        this.semanticValue = false;
        this.startSearching(this.semanticValue);
    }

    semantic(): void {
        this.semanticValue = true;
        this.startSearching(this.semanticValue);
    }

    startSearching(semantic: boolean): void {
        const keyAndSemantic = [this.searchKey, semantic];
        this.searchKeyEmmit.emit(keyAndSemantic);
        // this.communicationService.setIsSearchKey(true);
    }

    // by entering a letter on the form, a request will be sent to the node server and then it will be sent to suggestion-window
    onSuggest(): void {
        this.nodeService.suggest(this.searchKey).subscribe(data => {
            this.communicationService.setSuggest(data.suggest[0].options);
            this.windowSuggestion = true;
        });
    }
    basket(): void{
        this.basketChecked.emit();
    }
}
