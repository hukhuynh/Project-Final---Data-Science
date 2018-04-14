import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricPredictorComponent } from './lyric-predictor.component';

describe('LyricPredictorComponent', () => {
  let component: LyricPredictorComponent;
  let fixture: ComponentFixture<LyricPredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyricPredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
