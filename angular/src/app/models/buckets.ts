import {Type} from 'class-transformer';
import {Bucket} from './bucket';

export class Buckets {
    @Type(() => Bucket)
    private buckets: Bucket[];
    getBuckets(): Bucket[] {
        return this.buckets;
    }
}
