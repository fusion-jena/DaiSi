import {Injectable} from '@angular/core';
import {Result} from '../../models/gfbio/result';
import {Hit} from '../../models/gfbio/hit';

@Injectable({
  providedIn: 'root'
})
export class BiodivPreprocessDataService {

  constructor() { }
  getResult(jsonObject): Result {
    const result = new Result();
    const hits: Hit[] = this.getHits(jsonObject);
    result.setHits(hits);
    result.setTotalNumber(jsonObject.docsCount);
    return result;
  }
  getHits(jsonObject): Hit[] {
    const hits: Hit[] = [];
    const hitsOfObject = jsonObject.hits;
    hitsOfObject.forEach(item => {
      hits.push(this.getHit(item));
    });
    return hits;
  }
  getHit(item): Hit {
    return new Hit();
  }
}
