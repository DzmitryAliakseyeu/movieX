import { computed, inject, Injectable } from '@angular/core';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';
import { MediaType } from '../../../shared/models/common.models';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MovieDiscoverResult, TvShowDiscoverResult } from 'tmdb-ts/dist/types/discover';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { TmdbImageService } from '../../../core/services/tmdb-image.service';
import { MovieQueryOptions, TvShowQueryOptions } from 'tmdb-ts';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class CatalogService {
  private tmdbApiService = inject(TmdbApiService);
  protected tmdbImageService = inject(TmdbImageService);
  private route = inject(ActivatedRoute);
  readonly queryParams = toSignal(this.route.queryParams);
  readonly mediaType = toSignal(this.route.params.pipe(map((p) => p['mediaType'] as MediaType)));

  readonly catalogResource = rxResource<
    TvShowDiscoverResult | MovieDiscoverResult | undefined,
    { mediaType: MediaType | undefined; query: Params | undefined }
  >({
    params: () => {
      return {
        mediaType: this.mediaType(),
        query: this.queryParams(),
      };
    },
    stream: ({ params }) => {
      const urlParams = params.query;
      if (!params.mediaType || !urlParams) {
        return of(undefined);
      }

      const keywordsString = urlParams['with_keywords'] || '';
      const words = keywordsString.trim() ? keywordsString.split(',') : [];

      const keywordsObservable: Observable<string | undefined> =
        words.length > 0
          ? forkJoin(
              words.map((word: string) =>
                this.tmdbApiService
                  .searchKeywordId({ query: word, page: 1 })
                  .pipe(map((res) => res.results?.[0]?.id)),
              ) as Observable<string | undefined>[],
            ).pipe(map((ids) => ids.filter((id) => !!id).join(',')))
          : of(undefined);

      return keywordsObservable.pipe(
        switchMap((keywordsIds) => {
          if (this.mediaType() === MediaType.Movie) {
            return this.tmdbApiService.discoverMovie(
              this.getMovieQueryOptions(urlParams, keywordsIds),
            );
          }
          return this.tmdbApiService.discoverTvShow(
            this.getTvShowQueryOptions(urlParams, keywordsIds),
          );
        }),
      );
    },
  });

  readonly genres = toSignal(
    toObservable(this.mediaType).pipe(
      switchMap((type) => {
        return type === 'movie'
          ? this.tmdbApiService.getMovieGenres().pipe(map((response) => response.genres))
          : this.tmdbApiService.getTvShowGenres().pipe(map((response) => response.genres));
      }),
    ),
  );

  readonly catalogCards = computed(() => {
    return this.catalogResource.value()?.results.map((catalogItem) => {
      const title = 'title' in catalogItem ? catalogItem.title : catalogItem.name;
      const date =
        'release_date' in catalogItem ? catalogItem.release_date : catalogItem.first_air_date;

      const imageUrl = this.tmdbImageService.buildImageUrl({
        path: catalogItem.poster_path,
        size: 'w500',
      });

      return {
        id: catalogItem.id,
        title,
        date,
        imageUrl,
      };
    });
  });

  private getMovieQueryOptions(
    urlParams: Params,
    keywordsIds?: string,
  ): Partial<MovieQueryOptions> {
    const movieQueryOptions: Partial<MovieQueryOptions> = {
      page: +(urlParams['page'] || 1),
      with_keywords: keywordsIds,
      with_genres: urlParams['with_genres'],
      primary_release_year: urlParams['year'] ? +urlParams['year'] : undefined,
    };

    return Object.fromEntries(
      Object.entries(movieQueryOptions).filter(([, value]) => value !== undefined),
    );
  }

  private getTvShowQueryOptions(
    urlParams: Params,
    keywordsIds?: string,
  ): Partial<TvShowQueryOptions> {
    const tvShowQueryOptions: Partial<TvShowQueryOptions> = {
      page: +(urlParams['page'] || 1),
      with_keywords: keywordsIds,
      with_genres: urlParams['with_genres'],
      first_air_date_year: urlParams['year'] ? +urlParams['year'] : undefined,
    };

    return Object.fromEntries(
      Object.entries(tvShowQueryOptions).filter(([, value]) => value !== undefined),
    );
  }
}
