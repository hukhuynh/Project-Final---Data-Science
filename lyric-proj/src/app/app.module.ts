import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//import {LyricsService} from './lyrics.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LyricPredictorComponent } from './lyric-predictor/lyric-predictor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LyricsService } from './lyrics.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LyricPredictorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home',component: HomeComponent},
      {path: 'lyricpredictor', component: LyricPredictorComponent},
      {path:'**', redirectTo: 'app', pathMatch:'full'}
    ]),
    ReactiveFormsModule
  ],
  providers: [ 
    HttpClient,
    LyricsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
