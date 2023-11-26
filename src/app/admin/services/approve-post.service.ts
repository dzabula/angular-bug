import { Injectable } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CONFIGURATION} from "../../constants/config";
import {API} from "../../constants/Api";
import { Observable } from 'rxjs';
import { INotApprovePost } from '../approve-post/i-notapproved-post.interface';

@Injectable({
  providedIn: 'root'
})
export class ApprovePostService extends ApiService<INotApprovePost>{


  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL+API.NOTAPPROVEDPOSTS)
  }

  override get(): Observable<INotApprovePost[]>{
    return this.client.get<INotApprovePost[]>(this.url,{ headers: this.headers });
  }

  sendPutRequest(postId: number): Observable<any> {
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const putUrl = CONFIGURATION.APIURL + API.APPROVEDPOSTS+"/"+postId; 
    return this.client.put(putUrl, null,{ headers: headers });
  }
}