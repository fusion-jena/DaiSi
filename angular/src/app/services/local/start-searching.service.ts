import { Injectable } from '@angular/core';
import {NodeService} from '../remote/node.service';
import {CommunicationService} from './communication.service';
import {GfbioPreprocessDataService} from './gfbio-preprocess-data.service';

@Injectable({
  providedIn: 'root'
})
export class StartSearchingService {

  constructor(private nodeService: NodeService, private communicationService: CommunicationService,
              private gfbioPreprocessData: GfbioPreprocessDataService) { }
  startSearching(searchKey = '', semantic, from, filters): void{
      let urlTerm: string;
      const urlIndex = '/gfbio';
      let body: any;
      let key;
      if (semantic === true) {
          key = searchKey.split(' ');
          urlTerm = '/semantic-search';
      } else {
          key = searchKey;
          urlTerm = '/search';
      }
      body = JSON.stringify({queryterm: key, from,
          size: 10, filter: filters});
      console.log(body);
      this.nodeService.search(
          urlIndex + urlTerm,
          body,
          this.gfbioPreprocessData, [semantic]);
  }
}
