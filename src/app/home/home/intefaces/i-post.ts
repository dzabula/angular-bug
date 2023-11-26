import { IComment } from "./i-comment";

export interface IPost {
    postId:number; 
    title: string; 
    description:string;
    author: string;
    likes: number; 
    createdAt: string;
    image:string;
    tags:string[];
    dislikes: number; 
    commentsCount: number;
    comments: IComment[];
    userWhoReacted: any[];
  }