import {Component, OnInit} from '@angular/core';
import {NodeService} from '../services/remote/node.service';
import {CommunicationService} from '../services/local/communication.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {StartSearchingService} from '../services/local/start-searching.service';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
    faSearch = faSearch;
    searchKey: any;
    result: any;
    windowSuggestion = false;

    constructor(private nodeService: NodeService,
                private startSearchingService: StartSearchingService,
                private communicationService: CommunicationService) {
    }

    // the initial results when the page load
    // subscribe to the value of suggestion window
    ngOnInit(): any {
        this.communicationService.setPagination(0);
        this.communicationService.setIsSemantic(false);
        this.startSearching('');
    }

    onWindowSuggestKey(value): void{
        if (value !== undefined) {
            (document.getElementById('searchField') as HTMLInputElement).value = value;
            this.startSearching(value);
            this.searchKey = value;
            this.windowSuggestion = false;
        }
    }

    // by clicking on the submit button, this method will be called
    onSearch(): void {
        this.communicationService.setIsSemantic(false);
        this.startSearching(this.searchKey);
    }

    semantic(): void {
        this.communicationService.setIsSemantic(true);
        this.startSearching(this.searchKey);
    }

    // it communicates with the node server to get the result and send it to the search-output
    startSearching(searchKey): void {
        this.communicationService.setSearchKey(searchKey);
        this.communicationService.setIsSearchKey(true);
        this.communicationService.setPagination(0);
        this.startSearchingService.startSearching();
    }

    // by entering a letter on the form, a request will be sent to the node server and then it will be sent to suggestion-window
    onSuggest(): void {
        this.nodeService.suggest(this.searchKey).subscribe(data => {
            this.communicationService.setSuggest(data.suggest[0].options);
            this.windowSuggestion = true;
        });
    }
}
