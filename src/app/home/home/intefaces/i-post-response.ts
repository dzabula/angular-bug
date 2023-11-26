import { IPost } from "./i-post";

export interface IPostResponse {
    pagesCount: number;
    perPage: number;
    currentPage: number;
    count:number;
    data: IPost[];
  }