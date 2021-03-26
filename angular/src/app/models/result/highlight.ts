import {Expose, Type} from 'class-transformer';
import {Source} from './source';

export class Highlight {
    @Expose({ name: 'citation_title.folded' })
    private folded: string;
    getFolded(): string {
        return this.folded;
    }
}
