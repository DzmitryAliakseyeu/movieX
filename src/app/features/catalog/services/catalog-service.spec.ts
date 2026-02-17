import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog-service';
import { provideRouter } from '@angular/router';
import { Catalog } from '../catalog';
import { MediaType } from '../../../shared/models/common.models';
import { Configuration } from 'tmdb-ts';

describe('CatalogService', () => {
  let service: CatalogService;
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
    tmdbApiConfiguration: vi.fn().mockReturnValue(mockConfig),
    theme: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatalogService,
        provideRouter([{ path: MediaType.TVShow, component: Catalog }]),
        { provide: mockStore.tmdbApiConfiguration, useValue: mockConfig },
      ],
    });
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
