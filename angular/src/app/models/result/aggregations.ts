import {Type} from 'class-transformer';
import {Bucket} from './bucket';

export class Aggregations {
    @Type(() => Bucket)
    private buckets: Bucket[];
    private name: string;
    private title: string;
    private icon: string;

    getBuckets(): Bucket[] {
        return this.buckets;
    }
    setBuckets(buckets: Bucket[]): void {
        this.buckets = buckets;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }
    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }
 	getIcon(): string {
        return this.icon;
    }

    setIcon(icon: string): void {
        this.icon = icon;
    }


}
