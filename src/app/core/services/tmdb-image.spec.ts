import { TestBed } from '@angular/core/testing';
import { TmdbImageService } from './tmdb-image.service';
import { Store } from '../store/store';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';

describe('TmdbImage', () => {
  let service: TmdbImageService;
  const mockConfig: Partial<Configuration> = {
    images: {
      secure_base_url: 'https://image.tmdb.org/t/p',
      base_url: 'http://image.tmdb.org/t/p/',
      backdrop_sizes: [],
      logo_sizes: [],
      poster_sizes: ['w500'],
      profile_sizes: [],
      still_sizes: [],
    },
  };
  const mockStore = {
    tmdbApiConfiguration: signal<Partial<Configuration> | undefined>(mockConfig),
  };

  beforeEach(() => {
    mockStore.tmdbApiConfiguration.set(mockConfig);

    TestBed.configureTestingModule({
      providers: [TmdbImageService, { provide: Store, useValue: mockStore }],
    });

    service = TestBed.inject(TmdbImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildImageUrl', () => {
    it('should get image url if config is loaded', () => {
      const result = service.buildImageUrl({
        path: 'test-path.jpg',
        size: 'w500',
      });

      expect(result).toBe('https://image.tmdb.org/t/p/w500/test-path.jpg');
    });

    it('should return an empty string if there is no config', () => {
      mockStore.tmdbApiConfiguration.set(undefined);

      const result = service.buildImageUrl({
        path: 'test-path.jpg',
        size: 'w500',
      });

      expect(result).toBe('');
    });
  });
});
