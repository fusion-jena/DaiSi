import {Result} from '../models/result/result';

export interface SearchResult {
    result: Result;

    checkBox(data): void;
    paginationClicked(from): void;
}
