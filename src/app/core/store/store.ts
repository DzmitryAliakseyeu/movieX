import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { forkJoin, pipe, switchMap, tap } from 'rxjs';
import { TmdbApiService } from '../services/tmdb-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PosterI, State } from './store.model';

const initialState: State = {
  catalogs: [
    {
      id: 'movies',
      title: 'Movies',
      content: [],
    },
    {
      id: 'upcomming-movies',
      title: 'Upcomming Movies',
      content: [],
    },
    {
      id: 'tv-shows',
      title: 'TV Shows',
      content: [],
    },
  ],
  searchResults: [],
  searchPostersResults: [],
  tmdbApiConfiguration: undefined,
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),

  withMethods((store, tmdbApi = inject(TmdbApiService)) => ({
    loadAllCatalogs() {
      forkJoin({
        movies: tmdbApi.getPopularMovieList(),
        tvShow: tmdbApi.getPopularTvShowsList(),
        upcoming: tmdbApi.getUpcomingMovieList(),
      })
        .pipe(
          tap(({ movies, tvShow, upcoming }) => {
            patchState(store, (state) => ({
              catalogs: state.catalogs.map((catalog) => {
                if (catalog.title === 'Movies')
                  return {
                    ...catalog,
                    content: movies.results.map((item) => ({
                      id: item.id,
                      title: item.title,
                      date: item.release_date,
                      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    })),
                  };
                if (catalog.title === 'Upcomming Movies')
                  return {
                    ...catalog,
                    content: upcoming.results.map((item) => ({
                      id: item.id,
                      title: item.title || item.title,
                      date: item.release_date,
                      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    })),
                  };
                if (catalog.title === 'TV Shows')
                  return {
                    ...catalog,
                    content: tvShow.results.map((item) => ({
                      id: item.id,
                      title: item.name || item.name,
                      date: item.first_air_date,
                      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    })),
                  };
                return catalog;
              }),
            }));
          }),
        )
        .subscribe();
    },

    saveSearchPostersResults(results: PosterI[] | []) {
      patchState(store, {
        searchPostersResults: results.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
        })),
      });

      return;
    },

    _fetchTmdbApiConfiguration: rxMethod<void>(
      pipe(
        switchMap(() => {
          return tmdbApi.getTmdbApiConfiguration().pipe(
            tapResponse({
              next: (config) => {
                patchState(store, {
                  tmdbApiConfiguration: config,
                });
              },
              error: () => {
                console.error('Failed to load TMDB API configuration');
              },
            }),
          );
        }),
      ),
    ),
  })),

  withHooks({
    onInit(store) {
      store._fetchTmdbApiConfiguration();
    },
  }),
);
