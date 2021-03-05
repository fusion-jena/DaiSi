export class Citation{
    private title;
    private creator;
    private date;
    private source;
    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }
    getCreator(): string {
        return this.creator;
    }

    setCreator(creator: string): void {
        this.creator = creator;
    }
    getDate(): string {
        return this.date;
    }

    setDate(date: string): void {
        this.date = date;
    }
    getSource(): string {
        return this.source;
    }

    setSource(source: string): void {
        this.source = source;
    }
}
