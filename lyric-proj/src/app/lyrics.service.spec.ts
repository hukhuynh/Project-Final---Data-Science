import { TestBed, inject } from '@angular/core/testing';

import { LyricsService } from './lyrics.service';

describe('LyricsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LyricsService]
    });
  });

  it('should be created', inject([LyricsService], (service: LyricsService) => {
    expect(service).toBeTruthy();
  }));
});
