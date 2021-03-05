import {Type} from 'class-transformer';
import {Buckets} from './buckets';

export class Aggregations {
    @Type(() => Buckets)
    private year: Buckets;
    @Type(() => Buckets)
    private dataCenter: Buckets;
    @Type(() => Buckets)
    private gfbioDataKind: Buckets;
    @Type(() => Buckets)
    private parameter: Buckets;
    @Type(() => Buckets)
    private taxonomy: Buckets;
    @Type(() => Buckets)
    private region: Buckets;

    getYear(): Buckets {
        return this.year;
    }

    getDataCenter(): Buckets {
        return this.dataCenter;
    }

    getGfbioDataKind(): Buckets {
        return this.gfbioDataKind;
    }

    getParameter(): Buckets {
        return this.parameter;
    }

    getTaxonomy(): Buckets {
        return this.taxonomy;
    }

    getRegion(): Buckets {
        return this.region;
    }
}
