// the descriptions after the title of the dataset
export class Description {
    // the key of the description
    private title: string;
    // the description value
    private value: string;

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
