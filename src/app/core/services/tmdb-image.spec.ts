import { TestBed } from '@angular/core/testing';

import { TmdbImageService } from './tmdb-image.service';

describe('TmdbImage', () => {
  let service: TmdbImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
