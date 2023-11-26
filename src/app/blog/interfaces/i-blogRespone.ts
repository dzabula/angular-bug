import { IBlog } from "./i-blog";

export interface IBlogResponse {
    pagesCount: number;
    perPage: number;
    currentPage: number;
    count:number;
    data:IBlog[];
}