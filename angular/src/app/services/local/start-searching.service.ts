import { Injectable } from '@angular/core';
import {NodeService} from '../remote/node.service';
import {CommunicationService} from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class StartSearchingService {

  constructor(private nodeService: NodeService, private communicationService: CommunicationService) { }
  startSearching(): void{
      this.nodeService.search(
          this.communicationService.getSearchKey(),
          this.communicationService.getPagination(),
          this.communicationService.getFilter());
      this.communicationService.setIsSearchKey(false);
  }
}
