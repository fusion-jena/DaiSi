import {Expose} from 'class-transformer';

export class Bucket {
    private key: string;
    @Expose({name: 'doc_count'})
    private docCount: number;
    private checked = false;

    getKey(): string {
        return this.key;
    }

    getChecked(): boolean {
        return this.checked;
    }

    setChecked(check: boolean): void {
        this.checked = check;
    }

    getDocCount(): number {
        return this.docCount;
    }
}
