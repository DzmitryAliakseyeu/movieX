import { MovieQueryOptions, TvShowQueryOptions } from 'tmdb-ts';
import { MediaType } from '../../shared/models/common.models';

export type CatalogState =
  | { mediaType: MediaType.Movie; query: MovieQueryOptions }
  | { mediaType: MediaType.TVShow; query: TvShowQueryOptions }
  | { mediaType: undefined; query: object };
