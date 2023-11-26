import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ApiService } from 'src/app/shared/services/api.service';
import { IPostResponse } from '../home/intefaces/i-post-response';
import { IPost } from '../home/intefaces/i-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiService<IPost> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.POSTS) 
  }

  getAll(): Observable<IPostResponse>{
    return this.client.get<IPostResponse>(this.url,{headers: this.headers});
  }

  filter(keyword:string){
    let params = new HttpParams();
    params = params.append('keyword', keyword);
    return this.client.get<IPostResponse>(this.url,{params:params,headers: this.headers});
  }
}
