import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { pipe, switchMap } from 'rxjs';
import { TmdbApiService } from '../services/tmdb-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { State } from './store.model';

const initialState: State = {
  tmdbApiConfiguration: undefined,
};

export const Store = signalStore(
  { providedIn: 'root' },

  withState<State>(initialState),

  withMethods((store, tmdbApi = inject(TmdbApiService)) => ({
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
