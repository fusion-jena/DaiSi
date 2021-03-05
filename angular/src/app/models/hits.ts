import {Hit} from './hit';
import {Type} from 'class-transformer';

export class Hits {
    private total: number;
    @Type(() => Hit)
    private hits: Hit[];
    getHits(): Hit[] {
        return this.hits;
    }
    getTotal(): number {
        return this.total;
    }
}
