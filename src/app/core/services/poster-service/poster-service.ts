import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { TmdbApiService } from '../tmdb-api.service';
import { PosterI, PreviewSliderI } from './poster-service.model';
import { TmdbImageService } from '../tmdb-image.service';

@Injectable({
  providedIn: 'root',
})
export class PosterService {
  public tmdbApi = inject(TmdbApiService);
  public tmdbImageService = inject(TmdbImageService);

  catalogs = signal<PreviewSliderI[]>([
    { id: 'movies', title: 'Movies', content: [] },
    { id: 'tv-shows', title: 'TV Shows', content: [] },
    { id: 'upcoming-movies', title: 'Upcoming Movies', content: [] },
  ]);

  searchResults = signal<PosterI[]>([]);
  searchPostersResults = signal<PosterI[]>([]);

  loadAllCatalogs() {
    return forkJoin({
      movies: this.tmdbApi.getPopularMovieList(),
      tvShow: this.tmdbApi.getPopularTvShowsList(),
      upcoming: this.tmdbApi.getUpcomingMovieList(),
    }).pipe(
      tap(({ movies, tvShow, upcoming }) => {
        this.catalogs.set(
          this.catalogs().map((catalog) => {
            if (catalog.title === 'Movies')
              return {
                ...catalog,
                content: movies.results.map((item) => ({
                  id: item.id,
                  title: item.title,
                  date: item.release_date,
                  imageUrl: this.tmdbImageService.buildImageUrl({
                    path: item.poster_path,
                    size: 'w500',
                  }),
                })),
              };
            if (catalog.title === 'TV Shows')
              return {
                ...catalog,
                content: tvShow.results.map((item) => ({
                  id: item.id,
                  title: item.name || item.name,
                  date: item.first_air_date,
                  imageUrl: this.tmdbImageService.buildImageUrl({
                    path: item.poster_path,
                    size: 'w500',
                  }),
                })),
              };
            if (catalog.title === 'Upcoming Movies')
              return {
                ...catalog,
                content: upcoming.results.map((item) => ({
                  id: item.id,
                  title: item.title || item.title,
                  date: item.release_date,
                  imageUrl: this.tmdbImageService.buildImageUrl({
                    path: item.poster_path,
                    size: 'w500',
                  }),
                })),
              };
            return catalog;
          }),
        );
      }),
    );
  }

  saveSearchPostersResults(results: PosterI[] | []) {
    this.searchPostersResults.set(
      results.map((item) => ({
        id: item.id,
        title: item.title,
        date: item.date,
      })),
    );
  }
}
