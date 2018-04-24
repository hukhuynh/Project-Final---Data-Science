import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers,Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LyricsService {
  private BASE_URL: string = 'http://127.0.0.1:5002';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  sendData(type:string,line:string): Observable<any> {
    let url: string = `${this.BASE_URL}/lyrics`;
    return this.http.post(url, {'type':type,'text':line}, {headers: this.headers});
  }

}
  // serverData: JSON;
  // lyricData: JSON;
  // lyricLine: string; 

  // constructor(private httpClient: HttpClient) { 
  //   this.lyricLine = '';
  // }

  // sayHi() {
  //   this.httpClient.get('http://127.0.0.1:5002/').subscribe(data => {
  //     this.serverData = data as JSON;
  //     console.log(this.serverData);
  //   })
  // }

  // getLyrics(UserLine:string){
  //   //add set code here
  //   this.lyricLine = UserLine;

  //   let subscription = this.httpClient.get('http://127.0.0.1:5002/lyrics').subscribe(data => {
  //     this.lyricData = data as JSON;
  //     console.log(this.lyricData);
  //   })
  // }