import {BlogPageDto} from "../model";
import {Optional} from "@utils/optional";
import * as _ from "lodash";

export type FeedMode = "init" | "reload" | "loaded" | "loaded-nodata" | "loaded-error";

export type FeedAction =
    | { type: "apply-search-params", searchParams: URLSearchParams }
    | { type: "page-loaded", data: BlogPageDto }
    | { type: "page-error", msg?: string };

export type FeedQuery =
    | { search: string }
    | { tags: string[] }
    | { year: number, month?: number, day?: number }
    | { /*empty*/ };

export type FeedPagedQuery =
    FeedQuery & { page?: number };

export function searchParamsToQuery(searchParams: URLSearchParams): FeedPagedQuery {
    const numericParam = (name: string) => {
        return Optional.of(searchParams.get(name))
            .map(v => v.trim())
            .filter(v => v.match(/^\d+$/) !== null)
            .map(v => parseInt(v))
            .filter(v => !isNaN(v));
    };

    const s = Optional.of(searchParams.get("s"))
        .map(v => v.trim())
        .filter(v => v.length > 0)
        .orUndefined();

    const t = searchParams.getAll("t")
        .map(v => v.trim())
        .filter(v => v.length > 0);

    const p = numericParam("p").orUndefined();

    let query: FeedPagedQuery;
    if (s) query = {search: s};
    else if (t.length > 0) query = {tags: t};
    else query = {};
    query.page = p;

    return query;
}

export function queryToSearchParams(query: FeedPagedQuery): any {
    const params: any = {};
    if ("search" in query)
        params.s = query.search;
    if ("tags" in query && query.tags.length > 0)
        params.t = query.tags;
    if (query.page && query.page > 1)
        params.p = query.page;
    return params;
}

export class FeedState {
    static readonly initial = new FeedState();
    mode: FeedMode;
    query: FeedPagedQuery;
    data?: BlogPageDto;

    constructor() {
        this.mode = "init";
        this.query = {};
    }

    static reducer(state: FeedState, action: FeedAction): FeedState {
        switch (action.type) {
            case "apply-search-params":
                const newQuery = searchParamsToQuery(action.searchParams);
                if (!_.isEqual(state.query, newQuery)) {
                    return {...FeedState.initial, mode: "reload", query: newQuery};
                }
                break;

            case "page-loaded":
                return {
                    ...state,
                    data: action.data,
                    mode: _.isEmpty(action.data.posts) ? "loaded-nodata" : "loaded"
                };

            case "page-error":
                return {
                    ...state,
                    data: undefined,
                    mode: "loaded-error"
                };
        }

        return state;
    }
}
