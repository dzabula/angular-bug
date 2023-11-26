import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { IBlogDetails } from '../interfaces/i-blog-details';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})

export class BlogDetailsService extends ApiService<IBlogDetails>{

  constructor(public override client: HttpClient) {
    super(client,CONFIGURATION.APIURL+API.BLOGS);  
  }

  override getOne(id: number): Observable<IBlogDetails> {
    return this.client.get<any>(`${this.url}/${id}`, { headers: this.headers });
  }
}
