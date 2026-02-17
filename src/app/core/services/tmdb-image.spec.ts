import { TestBed } from '@angular/core/testing';
import { TmdbImageService } from './tmdb-image.service';
import { State, Store } from '../store/store';
import { Configuration } from 'tmdb-ts';
import { patchState, WritableStateSource } from '@ngrx/signals';

describe('TmdbImage', () => {
  let service: TmdbImageService;
  let store: InstanceType<typeof Store>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmdbImageService, Store],
    });
    service = TestBed.inject(TmdbImageService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildImageUrl', () => {
    it('should get image url if config is loaded', () => {
      patchState(store as unknown as WritableStateSource<State>, {
        tmdbApiConfiguration: mockConfig as Configuration,
      });

      const path = 'test-path.jpg';
      const size = 'w500';
      const baseUrl = store.tmdbApiConfiguration()!.images.secure_base_url;
      const result = service.buildImageUrl({ path, size });

      expect(result).toBe(`${baseUrl}/${size}/${path}`);
    });

    it('should return an empty string if there is no config', () => {
      const result = service.buildImageUrl({
        path: '/test-path.jpg',
        size: 'w500',
      });

      expect(result).toBe('');
    });
  });
});
