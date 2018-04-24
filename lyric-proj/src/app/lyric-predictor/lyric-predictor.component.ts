import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LyricsService } from '../lyrics.service'

@Component({
  selector: 'app-lyric-predictor',
  templateUrl: './lyric-predictor.component.html',
  styleUrls: ['./lyric-predictor.component.css']
})
export class LyricPredictorComponent {

  lyricForm = new FormGroup({
    modelType: new FormControl(),
    lyric: new FormControl()
  });
  
  predicted:boolean;
  serverData: JSON;
  lyricData: JSON;
  lyricLine: string; 

  constructor(private httpClient: HttpClient,
              private lyricsService: LyricsService) {
    this.predicted = false;
    this.lyricLine='';
  }

  onSubmit(){
    this.lyricsService.sendData(this.lyricForm.value.modelType, this.lyricForm.value.lyric).subscribe(data=>{
    },
    error => console.log("Error: ", error),
    () => this.getLyrics())
    //this.getLyrics();
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
