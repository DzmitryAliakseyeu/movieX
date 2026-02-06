import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { delay, forkJoin, tap } from 'rxjs';
import { TmdbApi } from '../services/tmdb-api';

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
}

interface State {
  theme: 'light' | 'dark';
  catalogs: CatalogI[];
  searchPostersResults: PosterI[] | [];
  searchPeopleResults: PersonI[] | []
  people: PersonI[];
}

export const Store = signalStore(
  { providedIn: 'root' },

  withState<State>({
    theme: 'light',
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
  }),

  withMethods((store, http = inject(TmdbApi)) => ({
    setTheme(theme: 'light' | 'dark') {
      patchState(store, {
        theme: theme,
      });
      document.body.style.colorScheme = theme;
    },
    toggleTheme() {
      const next = store.theme() === 'light' || '' ? 'dark' : 'light';

      patchState(store, {
        theme: next,
      });

      document.body.style.colorScheme = next;
    },

    loadAllCatalogs() {
      forkJoin({
        movies: http.getPopularMovieList(),
        tvShow: http.getPopularTvShowsList(),
        upcoming: http.getUpcomingMovieList(),
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
         searchPeopleResults: []
      });
      return
    },

    saveSearchPeopleResults(results: PersonI[] | []){
      patchState(store, {
           searchPostersResults: [],
      searchPeopleResults: results.map(item => ({ id: item.id, name: item.name, profile_path: item.profile_path})), });

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
  })),
);
