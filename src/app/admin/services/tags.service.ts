import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { ITag } from 'src/app/shared/interface/i-tag';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends ApiService<ITag> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.TAGS) 
  }
}
