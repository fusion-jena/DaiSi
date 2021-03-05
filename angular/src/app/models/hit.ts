import {Expose, Type} from 'class-transformer';
import {Source} from './source';
import {Highlight} from './highlight';

export class Hit {
    @Type(() => Source)
    @Expose({ name: '_source' })
    private source: Source;
    @Type(() => Highlight)
    private highlight: Highlight;
    getSource(): Source {
        return this.source;
    }
   setSource(source: Source): void {
        this.source = source;
    }
    getHighlight(): Highlight {
        return this.highlight;
    }
}
