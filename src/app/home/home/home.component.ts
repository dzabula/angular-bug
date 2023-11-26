import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { IPost } from './intefaces/i-post';
import { IPostResponse } from './intefaces/i-post-response';
import { HttpHeaders } from '@angular/common/http';
import { BlogService } from 'src/app/blog/services/blog.service';
import { IBlog } from 'src/app/blog/interfaces/i-blog';
import { JwtHeader } from 'jwt-decode';
import { JwtHandlerComponent } from 'src/app/shared/components/jwt-handler/jwt-handler.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {  
  posts: IPost[];
  keyword:string;
  blogs: IBlog[];
  isLoggedIn:boolean;


  constructor(private postService: PostService,
    private blogService: BlogService,
    private jwtHandler: JwtHandlerComponent){
      this.isLoggedIn = this.jwtHandler.IsValidToken() && this.jwtHandler.GetUser().Role != "Admin";

  }

  ngOnInit(): void {
    
    let token = localStorage.getItem("token");
    this.postService.headers = new HttpHeaders().set("Authorization","Bearer "+token);
    this.postService.getAll().subscribe({
      next:response =>{
        this.posts = response.data;
        console.log("posts",this.posts);
      }
    })

    this.blogService.getBlogs().subscribe({
      next:response=>{
        this.blogs = response.data;
      }
    })
  }

  search(){
    this.postService.filter(this.keyword).subscribe({
      next:response =>{
        this.posts = response.data;
      }
    })
  }


}
