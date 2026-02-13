import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AppendToResponse,
  AppendToResponseMovieKey,
  AppendToResponsePersonKey,
  AppendToResponseTvKey,
  Collection,
  CollectionImageOptions,
  Company,
  Configuration,
  CreditResponse,
  Credits,
  ExternalIdOptions,
  ExternalIds,
  FindResult,
  ImageCollection,
  Keyword,
  LanguageOption,
  Movie,
  MovieDetails,
  MovieDiscoverResult,
  MovieQueryOptions,
  MoviesPlayingNow,
  MultiSearchResult,
  PageOption,
  Person,
  PopularMovies,
  Recommendations,
  RegionOption,
  Reviews,
  Search,
  SimilarMovies,
  TopRatedTvShows,
  Translations,
  TV,
  TvShowQueryOptions,
  UpcomingMovies,
} from 'tmdb-ts';
import { environment } from '../../../environments/environment';
import {
  Genres,
  MovieSearchOptions,
  MoviesImageSearchOptions,
  MultiSearchOptions,
  PeopleSearchOptions,
  TvSearchOptions,
} from 'tmdb-ts/dist/endpoints';
import { SearchOptions } from 'tmdb-ts/dist/endpoints/search';
import { TvShowDiscoverResult } from 'tmdb-ts/dist/types/discover';
import { TopRatedMovies } from 'tmdb-ts/dist/types/movies';
import {
  Images,
  PersonDetails,
  PopularTvShows,
  ReviewDetails,
  TvShowDetails,
} from 'tmdb-ts/dist/types';
import { PopularPeople } from 'tmdb-ts/dist/types/people';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  private http = inject(HttpClient);

  // collections

  getCollectionDetails(id: number, params?: LanguageOption): Observable<Collection> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Collection>(`${environment.tmdbBaseUrl}/collection/${id}`, {
      params: httpParams,
    });
  }

  getCollectionImages(id: number, params?: CollectionImageOptions): Observable<ImageCollection> {
    const httpParams = new HttpParams({ fromObject: { ...params } as Record<string, string> });
    return this.http.get<ImageCollection>(`${environment.tmdbBaseUrl}/collection/${id}/images`, {
      params: httpParams,
    });
  }

  getCollectionTranslations(id: number, params?: CollectionImageOptions): Observable<Translations> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Translations>(`${environment.tmdbBaseUrl}/collection/${id}/translations`, {
      params: httpParams,
    });
  }

  // credits

  getCreditDetails(id: string, params?: LanguageOption): Observable<CreditResponse> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<CreditResponse>(`${environment.tmdbBaseUrl}/credit/${id}`, {
      params: httpParams,
    });
  }

  // discover

  discoverMovie(params?: MovieQueryOptions): Observable<MovieDiscoverResult> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<Movie>>(`${environment.tmdbBaseUrl}/discover/movie`, {
      params: httpParams,
    });
  }

  discoverTvShow(params?: TvShowQueryOptions): Observable<TvShowDiscoverResult> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<TvShowDiscoverResult>(`${environment.tmdbBaseUrl}/discover/tv`, {
      params: httpParams,
    });
  }

  // find

  findByExternalId(id: string, params: ExternalIdOptions): Observable<FindResult> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<FindResult>(`${environment.tmdbBaseUrl}/find/${id}`, {
      params: httpParams,
    });
  }

  // genres

  getMovieGenres(params?: LanguageOption): Observable<Genres> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Genres>(`${environment.tmdbBaseUrl}/genre/movie/list`, {
      params: httpParams,
    });
  }

  getTvShowGenres(params?: LanguageOption): Observable<Genres> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Genres>(`${environment.tmdbBaseUrl}/genre/tv/list`, {
      params: httpParams,
    });
  }

  // keywords

  getKeywordDetails(id: number): Observable<Keyword> {
    return this.http.get<Keyword>(`${environment.tmdbBaseUrl}/keyword/${id}`);
  }

  // movie lists

  getNowPlayingMovieList(
    params?: PageOption & LanguageOption & RegionOption,
  ): Observable<MoviesPlayingNow> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<MoviesPlayingNow>(`${environment.tmdbBaseUrl}/movie/now_playing`, {
      params: httpParams,
    });
  }

  getPopularMovieList(params?: PageOption & LanguageOption): Observable<PopularMovies> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<PopularMovies>(`${environment.tmdbBaseUrl}/movie/popular`, {
      params: httpParams,
    });
  }

  getTopRatedMovieList(
    params?: PageOption & LanguageOption & RegionOption,
  ): Observable<TopRatedMovies> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<TopRatedMovies>(`${environment.tmdbBaseUrl}/movie/top_rated`, {
      params: httpParams,
    });
  }

  getUpcomingMovieList(
    params?: PageOption & LanguageOption & RegionOption,
  ): Observable<UpcomingMovies> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<UpcomingMovies>(`${environment.tmdbBaseUrl}/movie/upcoming`, {
      params: httpParams,
    });
  }

  // movies

  getDetailsById(
    id: number,
    appendToResponse?: AppendToResponseMovieKey[],
    params?: LanguageOption,
  ): Observable<AppendToResponse<MovieDetails, AppendToResponseMovieKey[] | undefined, 'movie'>> {
    let httpParams = new HttpParams({ fromObject: { ...params } });

    if (appendToResponse?.length) {
      httpParams = httpParams.set('append_to_response', appendToResponse.join(','));
    }

    return this.http.get<
      AppendToResponse<MovieDetails, AppendToResponseMovieKey[] | undefined, 'movie'>
    >(`${environment.tmdbBaseUrl}/movie/${id}`, { params: httpParams });
  }

  getMovieCredits(id: number, params?: LanguageOption): Observable<Credits> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Credits>(`${environment.tmdbBaseUrl}/movie/${id}/credits`, {
      params: httpParams,
    });
  }

  getMovieExternalIds(id: number): Observable<ExternalIds> {
    return this.http.get<ExternalIds>(`${environment.tmdbBaseUrl}/movie/${id}/external_ids`);
  }

  getMovieImages(id: number, params?: MoviesImageSearchOptions): Observable<Images> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Images>(`${environment.tmdbBaseUrl}/movie/${id}/images`, {
      params: httpParams,
    });
  }

  getMovieRecommendations(
    id: number,
    params?: LanguageOption & PageOption,
  ): Observable<Recommendations> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Recommendations>(
      `${environment.tmdbBaseUrl}/movie/${id}/recommendations`,
      { params: httpParams },
    );
  }

  getMovieReviews(id: number, params?: LanguageOption & PageOption): Observable<Reviews> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Reviews>(`${environment.tmdbBaseUrl}/movie/${id}/reviews`, {
      params: httpParams,
    });
  }

  getMoviesSimilar(id: number, params?: LanguageOption & PageOption): Observable<SimilarMovies> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<SimilarMovies>(`${environment.tmdbBaseUrl}/movie/${id}/similar`, {
      params: httpParams,
    });
  }

  // people lists

  getPeopleListOrderedByPopularity(
    params?: LanguageOption & PageOption,
  ): Observable<PopularPeople> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<PopularPeople>(`${environment.tmdbBaseUrl}/person/popular`, {
      params: httpParams,
    });
  }

  // people

  getPersonDetails(
    id: number,
    appendToResponse?: AppendToResponsePersonKey[],
    language?: string,
  ): Observable<
    AppendToResponse<PersonDetails, AppendToResponsePersonKey[] | undefined, 'person'>
  > {
    let httpParams = new HttpParams();

    if (language) {
      httpParams = httpParams.set('language', language);
    }

    if (appendToResponse?.length) {
      httpParams = httpParams.set('append_to_response', appendToResponse.join(','));
    }

    return this.http.get<
      AppendToResponse<PersonDetails, AppendToResponsePersonKey[] | undefined, 'person'>
    >(`${environment.tmdbBaseUrl}/person/${id}`, { params: httpParams });
  }

  // reviews

  getMovieOrTVShowReviewDetails(id: string): Observable<ReviewDetails> {
    return this.http.get<ReviewDetails>(`${environment.tmdbBaseUrl}/review/${id}`);
  }

  // search

  searchCollections(params: SearchOptions): Observable<Search<Collection>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<Collection>>(`${environment.tmdbBaseUrl}/search/collection`, {
      params: httpParams,
    });
  }

  searchCompanies(params: SearchOptions): Observable<Search<Company>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<Company>>(`${environment.tmdbBaseUrl}/search/company`, {
      params: httpParams,
    });
  }

  searchKeywordId(params: SearchOptions): Observable<Search<{ id: string; name: string }>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<{ id: string; name: string }>>(
      `${environment.tmdbBaseUrl}/search/keyword`,
      { params: httpParams },
    );
  }

  searchMovies(params: MovieSearchOptions): Observable<Search<Movie>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<Movie>>(`${environment.tmdbBaseUrl}/search/movie`, {
      params: httpParams,
    });
  }

  searchMulti(params: MultiSearchOptions): Observable<Search<MultiSearchResult>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<MultiSearchResult>>(`${environment.tmdbBaseUrl}/search/multi`, {
      params: httpParams,
    });
  }

  searchPerson(params: PeopleSearchOptions): Observable<Search<Person>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<Person>>(`${environment.tmdbBaseUrl}/search/person`, {
      params: httpParams,
    });
  }

  searchTvShow(params: TvSearchOptions): Observable<Search<TV>> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<Search<TV>>(`${environment.tmdbBaseUrl}/search/tv`, {
      params: httpParams,
    });
  }

  // TV series lists

  getPopularTvShowsList(params?: PageOption & LanguageOption): Observable<PopularTvShows> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<PopularTvShows>(`${environment.tmdbBaseUrl}/tv/popular`, {
      params: httpParams,
    });
  }

  getTopRatedTvShowsList(params?: PageOption & LanguageOption): Observable<TopRatedTvShows> {
    const httpParams = new HttpParams({ fromObject: { ...params } });
    return this.http.get<TopRatedTvShows>(`${environment.tmdbBaseUrl}/tv/top_rated`, {
      params: httpParams,
    });
  }

  // tv series

  getTvShowDetails(
    id: number,
    appendToResponse?: AppendToResponseTvKey[],
    language?: string,
  ): Observable<AppendToResponse<TvShowDetails, AppendToResponseTvKey[] | undefined, 'tvShow'>> {
    let httpParams = new HttpParams();

    if (language) {
      httpParams = httpParams.set('language', language);
    }

    if (appendToResponse?.length) {
      httpParams = httpParams.set('append_to_response', appendToResponse.join(','));
    }

    return this.http.get<
      AppendToResponse<TvShowDetails, AppendToResponseTvKey[] | undefined, 'tvShow'>
    >(`${environment.tmdbBaseUrl}/tv/${id}`, { params: httpParams });
  }

  // configuration

  getTmdbApiConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>(`${environment.tmdbBaseUrl}/configuration`);
  }
}
