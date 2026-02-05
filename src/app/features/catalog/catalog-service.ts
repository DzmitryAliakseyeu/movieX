import { computed, inject, Injectable, signal } from '@angular/core';
import { TmdbApi } from '../../core/services/tmdb-api';
import { MediaType } from '../../shared/models/common.models';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TvShowDiscoverResult, MovieDiscoverResult } from 'tmdb-ts/dist/types/discover';
import { MovieQueryOptions, TvShowQueryOptions } from 'tmdb-ts';
import { CatalogState } from './catalog.models';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private tmdbApiService = inject(TmdbApi);
  mediaType = signal<MediaType | undefined>(undefined);
  searchParams = signal<MovieQueryOptions | TvShowQueryOptions>({});

  private requestState = computed((): CatalogState => {
    const mediaType = this.mediaType();
    const query = this.searchParams();

    if (mediaType === MediaType.Movie) {
      return { mediaType, query: query as MovieQueryOptions };
    }
    if (mediaType === MediaType.TVShow) {
      return { mediaType, query: query as TvShowQueryOptions };
    }
    return { mediaType: undefined, query: {} };
  });

  readonly catalogResource = rxResource<
    TvShowDiscoverResult | MovieDiscoverResult | undefined,
    CatalogState | undefined
  >({
    params: () => {
      const state = this.requestState();
      return state.mediaType ? state : undefined;
    },
    stream: ({ params }) => {
      if (params.mediaType === MediaType.Movie) {
        return this.tmdbApiService.discoverMovie(params.query);
      }

      return this.tmdbApiService.discoverTvShow(this.searchParams() satisfies TvShowQueryOptions);
    },
  });

  readonly genres = toSignal(
    toObservable(this.mediaType).pipe(
      switchMap((type) => {
        return type === 'movie'
          ? this.tmdbApiService.getMovieGenres()
          : this.tmdbApiService.getTvShowGenres();
      }),
    ),
    { initialValue: { genres: [] } },
  );
}
