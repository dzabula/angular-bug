import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';
import { IBlogResponse } from '../interfaces/i-blogRespone';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public client: HttpClient) {
  }

  getBlogs(): Observable<IBlogResponse> {
    return this.client.get<IBlogResponse>(CONFIGURATION.APIURL+API.BLOGS);
  }
  
}
