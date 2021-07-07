export class Bucket {
    private key: string;
    private docCount: number;
    private checked = false;

    getKey(): string {
        return this.key;
    }
    setKey(key: string): void {
        this.key = key;
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
    setDocCount(docCount: number): void {
        this.docCount = docCount;
    }
}
