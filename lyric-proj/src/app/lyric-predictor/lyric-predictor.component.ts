import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lyric-predictor',
  templateUrl: './lyric-predictor.component.html',
  styleUrls: ['./lyric-predictor.component.css']
})
export class LyricPredictorComponent {

  lyric = new FormControl();
  predicted:boolean;
  serverData: JSON;
  lyricData: JSON;
  lyricLine: string; 

  constructor(private httpClient: HttpClient) {
    this.predicted = false;
    this.lyricLine='';
  }

  onSubmit(){
    this.lyricLine = this.lyric.value;
    this.getLyrics();
    this.predicted = true;
  }

  getLyrics() {
    //add set code here
    let subscription = this.httpClient.get('http://127.0.0.1:5002/lyrics').subscribe(data => {
      this.lyricData = data as JSON;
      console.log(this.lyricData);
    },
    error => console.log("Error: ", error),
    () => this.update())
  }

  update(){
    this.lyricLine = JSON.stringify(this.lyricData["text"])
  }
}
