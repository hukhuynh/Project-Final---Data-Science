import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LyricPredictorComponent } from './lyric-predictor/lyric-predictor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LyricPredictorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'home',component: HomeComponent},
      {path: 'lyricpredictor', component: LyricPredictorComponent},
      {path:'**', redirectTo: 'app', pathMatch:'full'}
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
