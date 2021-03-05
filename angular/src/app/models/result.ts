import {Hits} from './hits';
import {Expose, Type} from 'class-transformer';
import {Aggregations} from './aggregations';

export class Result {
    @Type(() => Hits)
    private hits: Hits;
    @Expose({name: 'lastItem'})
    private semanticKeys: Array<string>;
    @Type(() => Aggregations)
    private aggregations: Aggregations;
    getHits(): Hits {
        return this.hits;
    }
    getSemanticKeys(): Array<string> {
        return this.semanticKeys;
    }
    getAggregations(): Aggregations {
        return this.aggregations;
    }
}
