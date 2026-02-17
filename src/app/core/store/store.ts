import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { forkJoin, pipe, switchMap, tap } from 'rxjs';
import { TmdbApiService } from '../services/tmdb-api.service';
import { Configuration } from 'tmdb-ts';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

export interface PosterI {
  id: number;
  title: string;
  date: string;
  imageUrl?: string;
}

export interface CatalogI {
  id: string;
  title: string;
  content: PosterI[];
}

export interface State {
  theme: 'light' | 'dark';
  catalogs: CatalogI[];
  searchResults: PosterI[] | [];
  tmdbApiConfiguration: Configuration | undefined;
}

const initialState: State = {
  theme: 'dark',
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
  tmdbApiConfiguration: undefined,
};

export const Store = signalStore(
  { providedIn: 'root' },

  withState<State>(initialState),

  withMethods((store, tmdbApi = inject(TmdbApiService)) => ({
    setTheme(theme: 'light' | 'dark') {
      patchState(store, {
        theme: theme,
      });
      document.body.style.colorScheme = theme;
    },
    toggleTheme() {
      const next = store.theme() === 'light' ? 'dark' : 'light';

      patchState(store, {
        theme: next,
      });

      document.body.style.colorScheme = next;
    },

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

    saveSearchResults(results: PosterI[] | []) {
      patchState(store, {
        searchResults: results.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
        })),
      });
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
