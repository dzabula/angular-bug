import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { IPost } from '../home/intefaces/i-post';
import { HttpClient } from '@angular/common/http';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService  extends ApiService<boolean> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.REACTION) 
  }

  react(body: any, id:number): Observable<boolean>
  {
      return this.client.put<boolean>(this.url+"/"+id, body,{headers: this.headers})
  }
}