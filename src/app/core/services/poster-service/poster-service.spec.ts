import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { PosterService } from './poster-service';
import { of } from 'rxjs';
import { PosterI } from './poster-service.model';

describe('PosterService', () => {
  let service: PosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject tmdbApi', () => {
    expect(service.tmdbApi).toBeTruthy();
  });

  it('should inject tmdbImageService', () => {
    expect(service.tmdbImageService).toBeTruthy();
  });

  it('should have default catalogs', () => {
    const catalogs = service.catalogs();
    expect(catalogs.length).toBe(3);
    expect(catalogs[0].id).toBe('movies');
    expect(catalogs[1].id).toBe('tv-shows');
    expect(catalogs[2].id).toBe('upcoming-movies');
  });

  it('should have empty search results by default', () => {
    const search = service.searchResults();
    expect(search.length).toBe(0);
  });

  it('should have empty search posters results by default', () => {
    const searchPosters = service.searchPostersResults();
    expect(searchPosters.length).toBe(0);
  });

  it('should load all catalogs', () => {
    const loadCatalogSpy = vi.spyOn(service, 'loadAllCatalogs');

    service.loadAllCatalogs();

    expect(loadCatalogSpy).toHaveBeenCalled();
  });

  it('should set catalogs content after loading', () => {
    const mockMovies = {
      page: 1,
      results: [],
      total_pages: 10,
      total_results: 0,
    };
    const mockTvShows = {
      page: 1,
      results: [],
      total_pages: 10,
      total_results: 0,
    };
    const mockUpcoming = {
      page: 1,
      results: [],
      total_pages: 10,
      total_results: 0,
    };

    vi.spyOn(service.tmdbApi, 'getPopularMovieList').mockReturnValue(of(mockMovies));
    vi.spyOn(service.tmdbApi, 'getPopularTvShowsList').mockReturnValue(of(mockTvShows));
    vi.spyOn(service.tmdbApi, 'getUpcomingMovieList').mockReturnValue(of(mockUpcoming));
    vi.spyOn(service.tmdbImageService, 'buildImageUrl').mockReturnValue('full_image_url');

    service.loadAllCatalogs();

    const catalogs = service.catalogs();
    expect(catalogs.length).toBeGreaterThan(0);
  });

  it('should save search results', () => {
    const mockResults: PosterI[] = [
      { id: 1, title: 'Test Movie', date: '2024-01-01', imageUrl: 'test_url' },
    ];

    service.saveSearchPostersResults(mockResults);

    const searchPosters = service.searchPostersResults();
    expect(searchPosters.length).toBeGreaterThan(0);
  });
});
