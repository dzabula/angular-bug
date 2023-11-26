import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  private apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts';
  private apiKey = 'AIzaSyCGIy28vsetILem8rccH-IScrk5IASuvL8';  

  constructor(private httpClient: HttpClient) { }

  getFonts(): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&subset=cyrillic`;
    return this.httpClient.get<any>(url);
  }

  generateFontStyles(selectedFonts: string[]): string {
    const fontUrls = selectedFonts.map(font => `https://fonts.googleapis.com/css?family=${font.replace(/ /g, '+')}&subset=cyrillic&display=swap`);
    return fontUrls.map(url => `@import url('${url}');`).join('\n');
  }


}
