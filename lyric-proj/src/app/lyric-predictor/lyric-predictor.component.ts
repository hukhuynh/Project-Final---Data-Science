import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lyric-predictor',
  templateUrl: './lyric-predictor.component.html',
  styleUrls: ['./lyric-predictor.component.css']
})
export class LyricPredictorComponent {
  lyric = new FormControl();
  predicted:boolean;
  prediction:string = "some lyrics";

  constructor() {
    this.predicted = false;
  }

  onSubmit(){
    //call some backend service here
    this.predicted = true;
  }
}
