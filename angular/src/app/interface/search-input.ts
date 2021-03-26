export interface SearchInput {
    basketValues: Array<any>;

    basketChecked(): void;

    searchKeySubmitted(key): void;
}
