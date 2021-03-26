export class Description {
    private title;
    private value;

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }
    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }
}
