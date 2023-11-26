import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIGURATION } from 'src/app/constants/config';
import { API } from 'src/app/constants/Api';

@Injectable({
  providedIn: 'root'
})
export class AdminApproveService extends ApiService<boolean> {

  constructor(client: HttpClient) {
    super(client, CONFIGURATION.APIURL + API.APPROVEDPOSTS);  // Prilagodite URL prema vašim potrebama
  }

  override put(id: number): Observable<boolean> {
    const urlWithId = `${this.url}/${id}`;  // Dodajte ID u URL
    return this.client.put<boolean>(urlWithId, null, { headers: this.headers });  // Null za telo (body)
  }
  
}
