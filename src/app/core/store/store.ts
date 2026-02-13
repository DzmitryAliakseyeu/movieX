import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { delay, forkJoin, pipe, switchMap, tap } from 'rxjs';
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
export interface PersonI {
  id: number;
  name: string;
  profile_path: string;
  bio?: string;
  dateOfBirth?: string;
  dateOfDead?: string;
}

interface State {
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
  searchPostersResults: PosterI[] | [];
  searchPeopleResults: PersonI[] | [];
  people: PersonI[];
  activePerson: PersonI | null;
}

export const Store = signalStore(
  { providedIn: 'root' },

  withState<State>({
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
    searchPostersResults: [],
    searchPeopleResults: [],
    people: [],
    activePerson: null,
  }),

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
        searchPeopleResults: [],
      });
      return;
    },

    saveSearchPeopleResults(results: PersonI[] | []) {
      patchState(store, {
        searchPostersResults: [],
        searchPeopleResults: results.map((item) => ({
          id: item.id,
          name: item.name,
          profile_path: item.profile_path,
        })),
      });
    },

    loadPeople() {
      http
        .getPeopleListOrderedByPopularity()
        .pipe(
          delay(0),
          tap((response) => {
            patchState(store, {
              people: response.results.map((person) => ({
                id: person.id,
                name: person.original_name,
                profile_path: `https://image.tmdb.org/t/p/w500${person.profile_path}`,
              })),
            });
          }),
        )
        .subscribe();
    },
    savePersonDetail(id: number) {
      http
        .getPersonDetails(id)
        .pipe(
          tap((response) =>
            patchState(store, {
              activePerson: {
                id: response.id,
                name: response.name,
                profile_path: `https://image.tmdb.org/t/p/w500${response.profile_path}`,
                bio: response.biography,
                dateOfBirth: response.birthday,
                dateOfDead: response.deathday,
              },
            }),
          ),
        )
        .subscribe();
    },
    removePersonDetail() {
      patchState(store, { activePerson: null });
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
