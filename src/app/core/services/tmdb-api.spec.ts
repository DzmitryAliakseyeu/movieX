import { TestBed } from '@angular/core/testing';
import { TmdbApiService } from './tmdb-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  AppendToResponse,
  AppendToResponseMovieKey,
  AppendToResponsePersonKey,
  AppendToResponseTvKey,
  Collection,
  Company,
  Configuration,
  CreditResponse,
  Credits,
  ExternalIdOptions,
  ExternalIds,
  ImageCollection,
  Keyword,
  LanguageOption,
  Movie,
  MovieDetails,
  MovieDiscoverResult,
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
import { environment } from '../../../environments/environment.development';
import { MovieQueryOptions, TvShowDiscoverResult } from 'tmdb-ts/dist/types/discover';
import { FindResult } from 'tmdb-ts/dist/types/find';
import {
  Genres,
  MovieSearchOptions,
  MoviesImageSearchOptions,
  MultiSearchOptions,
  PeopleSearchOptions,
  TvSearchOptions,
} from 'tmdb-ts/dist/endpoints';
import { TopRatedMovies } from 'tmdb-ts/dist/types/movies';
import {
  Images,
  PersonDetails,
  PopularTvShows,
  ReviewDetails,
  TvShowDetails,
} from 'tmdb-ts/dist/types';
import { PopularPeople } from 'tmdb-ts/dist/types/people';
import { SearchOptions } from 'tmdb-ts/dist/endpoints/search';
import { Store } from '../store/store';

describe('TmdbApi service', () => {
  let tmdbApiService: TmdbApiService;
  let httpTesting: HttpTestingController;
  const baseUrl = environment.tmdbBaseUrl;
  const mockConfig: Partial<Configuration> = {
    images: {
      secure_base_url: 'https://image.tmdb.org/t/p',
      base_url: 'http://image.tmdb.org/t/p/',
      backdrop_sizes: [],
      logo_sizes: [],
      poster_sizes: ['w500'],
      profile_sizes: [],
      still_sizes: [],
    },
  };
  const mockStore = {
    tmdbApiConfiguration: vi.fn().mockReturnValue(mockConfig),
    theme: vi.fn(),
    setTheme: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TmdbApiService,
        { provide: Store, useValue: mockStore },
      ],
    });

    tmdbApiService = TestBed.inject(TmdbApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(tmdbApiService).toBeTruthy();
  });

  describe('collections', () => {
    describe('getCollectionDetails', () => {
      it('should return collection details (case: no additional params)', async () => {
        const collectionId = 1;
        const collection: Collection = {
          id: collectionId,
          name: 'Test Collection',
          overview: 'Test overview description',
          poster_path: '/test-poster.jpg',
          backdrop_path: '/test-backdrop.jpg',
        };
        const collectionPromise = firstValueFrom(tmdbApiService.getCollectionDetails(collectionId));
        const request = httpTesting.expectOne((req) => {
          return req.url.includes(`/collection/${collectionId}`) && req.method === 'GET';
        });

        request.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });

      it('should return collection details (case: all possible params)', async () => {
        const collectionId = 1;
        const collection: Collection = {
          id: collectionId,
          name: 'Test Collection',
          overview: 'Test overview description',
          poster_path: '/test-poster.jpg',
          backdrop_path: '/test-backdrop.jpg',
        };
        const language = 'br-FR';
        const collectionPromise = firstValueFrom(
          tmdbApiService.getCollectionDetails(collectionId, { language }),
        );

        const params = new URLSearchParams({
          language,
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/collection/${collectionId}?${params.toString()}`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });
    });

    describe('getCollectionImages', () => {
      it('should return collection images (case: no additional params)', async () => {
        const collectionId = 1;
        const collection: ImageCollection = {
          id: collectionId,
          backdrops: [],
          posters: [],
        };
        const collectionPromise = firstValueFrom(tmdbApiService.getCollectionImages(collectionId));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/collection/${collectionId}/images`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });

      it('should return collection images (case: all possible params)', async () => {
        const collectionId = 1;
        const collection: ImageCollection = {
          id: collectionId,
          backdrops: [],
          posters: [],
        };
        const language = 'br-FR';
        const collectionPromise = firstValueFrom(
          tmdbApiService.getCollectionImages(collectionId, { include_image_language: [language] }),
        );

        const params = new URLSearchParams({
          include_image_language: language,
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/collection/${collectionId}/images?${params.toString()}`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });
    });

    describe('getCollectionTranslations', () => {
      it('should return collection translations (case: no additional params)', async () => {
        const collectionId = 1;
        const collection: Translations = {
          id: collectionId,
          translations: [],
        };
        const collectionPromise = firstValueFrom(
          tmdbApiService.getCollectionTranslations(collectionId),
        );

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/collection/${collectionId}/translations`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });

      it('should return collection translations (case: all possible params)', async () => {
        const collectionId = 1;
        const collection: Translations = {
          id: collectionId,
          translations: [],
        };
        const language = 'br-FR';
        const collectionPromise = firstValueFrom(
          tmdbApiService.getCollectionTranslations(collectionId, { language }),
        );

        const params = new URLSearchParams({
          language,
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/collection/${collectionId}/translations?${params.toString()}`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });
    });
  });

  describe('credits', () => {
    describe('getCreditDetails', () => {
      it('should return credit details (case: no additional params)', async () => {
        const creditId = '1';
        const credit: CreditResponse = {};
        const creditsPromise = firstValueFrom(tmdbApiService.getCreditDetails(creditId));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/credit/${creditId}`,
        });

        req.flush(credit);

        const result = await creditsPromise;
        expect(result).toEqual(credit);
      });

      it('should return credit details (case: all possible params)', async () => {
        const creditId = '1';
        const credit: CreditResponse = {};
        const language = 'br-FR';
        const creditsPromise = firstValueFrom(
          tmdbApiService.getCreditDetails(creditId, { language }),
        );

        const params = new URLSearchParams({
          language,
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/credit/${creditId}?${params.toString()}`,
        });

        req.flush(credit);

        const result = await creditsPromise;
        expect(result).toEqual(credit);
      });
    });
  });

  describe('discover', () => {
    describe('discoverMovie', () => {
      it('should return movie discover result (case: no additional params)', async () => {
        const movie: MovieDiscoverResult = {
          page: 1,
          results: [],
          total_results: 100,
          total_pages: 20,
        };
        const moviePromise = firstValueFrom(tmdbApiService.discoverMovie());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/discover/movie`,
        });

        req.flush(movie);

        const result = await moviePromise;
        expect(result).toEqual(movie);
      });

      it('should return movie discover result (case: all possible params)', async () => {
        const movie: MovieDiscoverResult = {
          page: 1,
          results: [],
          total_results: 100,
          total_pages: 20,
        };
        const queryData: MovieQueryOptions = {
          region: 'US',
          certification_country: 'US',
          certification: 'PG-13',
          'certification.lte': 'PG-13',
          'certification.gte': 'G',
          include_adult: false,
          include_video: false,
          primary_release_year: 2020,
          'primary_release_date.gte': '2020-01-01',
          'primary_release_date.lte': '2020-12-31',
          'release_date.gte': '2020-01-01',
          'release_date.lte': '2020-12-31',
          with_release_type: '3',
          year: 2020,
          with_cast: '123',
          with_crew: '789',
          with_people: '123',
          language: 'en-US',
          sort_by: 'popularity.desc',
          page: 1,
          'vote_average.gte': 7,
          'vote_count.gte': 100,
          'vote_count.lte': 5000,
          'vote_average.lte': 10,
          with_watch_providers: '8',
          watch_region: 'US',
          without_companies: '2',
          with_watch_monetization_types: 'flatrate',
          'with_runtime.gte': 90,
          'with_runtime.lte': 180,
          with_genres: '28',
          without_genres: '27',
          with_original_language: 'en',
          without_keywords: '1234',
          with_keywords: '5678',
          with_companies: '1',
        };
        const moviePromise = firstValueFrom(tmdbApiService.discoverMovie(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/discover/movie?${params.toString()}`,
        });

        req.flush(movie);

        const result = await moviePromise;
        expect(result).toEqual(movie);
      });
    });

    describe('discoverTvShow', () => {
      it('should return tv show discover result (case: no additional params)', async () => {
        const tvShow: TvShowDiscoverResult = {
          page: 1,
          results: [],
          total_results: 100,
          total_pages: 20,
        };
        const tvShowPromise = firstValueFrom(tmdbApiService.discoverTvShow());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/discover/tv`,
        });

        req.flush(tvShow);

        const result = await tvShowPromise;
        expect(result).toEqual(tvShow);
      });

      it('should return tv show discover result (case: all possible params)', async () => {
        const tvShow: TvShowDiscoverResult = {
          page: 1,
          results: [],
          total_results: 100,
          total_pages: 20,
        };
        const queryData: TvShowQueryOptions = {
          'air_date.gte': '2023-01-01',
          'air_date.lte': '2023-12-31',
          'first_air_date.gte': '2020-01-01',
          'first_air_date.lte': '2024-01-01',
          first_air_date_year: 2020,
          timezone: 'New_York',
          with_networks: '213',
          include_null_first_air_dates: false,
          screened_theatrically: true,
          with_status: '0',
          with_type: '4',
          language: 'en-US',
          sort_by: 'popularity.desc',
          page: 1,
          'vote_average.gte': 8,
          'vote_count.gte': 100,
          'vote_count.lte': 1000,
          'vote_average.lte': 10,
          with_watch_providers: '8',
          watch_region: 'US',
          without_companies: '123',
          with_watch_monetization_types: 'flatrate',
          'with_runtime.gte': 20,
          'with_runtime.lte': 60,
          with_genres: '18',
          without_genres: '10767',
          with_original_language: 'en',
          without_keywords: '1234',
          with_keywords: '5678',
          with_companies: '456',
          include_adult: false,
        };
        const tvPromise = firstValueFrom(tmdbApiService.discoverTvShow(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/discover/tv?${params.toString()}`,
        });

        req.flush(tvShow);

        const result = await tvPromise;
        expect(result).toEqual(tvShow);
      });
    });
  });

  describe('find', () => {
    describe('findByExternalId', () => {
      it('should return find result (case: all possible params)', async () => {
        const findResult: FindResult = {
          movie_results: [],
          person_results: [],
          tv_results: [],
          tv_episode_results: [],
          tv_season_results: [
            {
              id: 101,
              name: 'Season 1',
              overview: 'The beginning of an epic journey.',
              air_date: '2020-01-01',
              episode_count: 10,
              poster_path: '/path_to_poster_1.jpg',
              season_number: 1,
              show_id: '123',
              media_type: 'tv',
            },
          ],
        };
        const id = '123';
        const queryData: ExternalIdOptions = {
          external_source: 'imdb_id',
          language: 'en-US',
        };
        const findResultPromise = firstValueFrom(tmdbApiService.findByExternalId(id, queryData));
        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/find/${id}?${params.toString()}`,
        });

        req.flush(findResult);

        const result = await findResultPromise;
        expect(result).toEqual(findResult);
      });
    });
  });

  describe('genres', () => {
    describe('getMovieGenres', () => {
      it('should return movie genres (case: no additional params)', async () => {
        const genres: Genres = {
          genres: [],
        };
        const genresPromise = firstValueFrom(tmdbApiService.getMovieGenres());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/genre/movie/list`,
        });

        req.flush(genres);

        const result = await genresPromise;
        expect(result).toEqual(genres);
      });

      it('should return movie genres (case: all possible params)', async () => {
        const genres: Genres = {
          genres: [],
        };
        const language = 'br-FR';
        const queryData: LanguageOption = {
          language,
        };
        const genresPromise = firstValueFrom(tmdbApiService.getMovieGenres(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/genre/movie/list?${params.toString()}`,
        });

        req.flush(genres);

        const result = await genresPromise;
        expect(result).toEqual(genres);
      });
    });

    describe('getTvShowGenres', () => {
      it('should return tv show genres (case: no additional params)', async () => {
        const genres: Genres = {
          genres: [],
        };
        const genresPromise = firstValueFrom(tmdbApiService.getTvShowGenres());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/genre/tv/list`,
        });

        req.flush(genres);

        const result = await genresPromise;
        expect(result).toEqual(genres);
      });

      it('should return tv show genres (case: all possible params)', async () => {
        const genres: Genres = {
          genres: [],
        };
        const language = 'br-FR';
        const queryData: LanguageOption = {
          language,
        };
        const genresPromise = firstValueFrom(tmdbApiService.getTvShowGenres(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/genre/tv/list?${params.toString()}`,
        });

        req.flush(genres);

        const result = await genresPromise;
        expect(result).toEqual(genres);
      });
    });
  });

  describe('keywords', () => {
    describe('getKeywordDetails', () => {
      it('should return keyword details', async () => {
        const id = 123;
        const keywordDetails: Keyword = {
          id,
          name: 'Test Keyword',
        };
        const keywordDetailsPromise = firstValueFrom(tmdbApiService.getKeywordDetails(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/keyword/${id}`,
        });

        req.flush(keywordDetails);

        const result = await keywordDetailsPromise;
        expect(result).toEqual(keywordDetails);
      });
    });
  });

  describe('movie lists', () => {
    describe('getNowPlayingMovieList', () => {
      it('should return now playing movie list (case: no additional params)', async () => {
        const movieList: MoviesPlayingNow = {
          page: 1,
          results: [],
          dates: {
            maximum: '2024-03-31',
            minimum: '2024-03-01',
          },
          total_pages: 10,
          total_results: 200,
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getNowPlayingMovieList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/now_playing`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });

      it('should return now playing movie list (case: all possible params)', async () => {
        const movieList: MoviesPlayingNow = {
          page: 1,
          results: [],
          dates: {
            maximum: '2024-03-31',
            minimum: '2024-03-01',
          },
          total_pages: 10,
          total_results: 200,
        };
        const queryData: PageOption & LanguageOption & RegionOption = {
          language: 'br-FR',
          page: 1,
          region: 'US',
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getNowPlayingMovieList(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/now_playing?${params.toString()}`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });
    });

    describe('getPopularMovieList', () => {
      it('should return popular playing movie list (case: no additional params)', async () => {
        const movieList: PopularMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getPopularMovieList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/popular`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });

      it('should return popular playing movie list (case: all possible params)', async () => {
        const movieList: PopularMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const queryData: PageOption & LanguageOption = {
          language: 'br-FR',
          page: 1,
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getPopularMovieList(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/popular?${params.toString()}`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });
    });

    describe('getTopRatedMovieList', () => {
      it('should return top rated movie list (case: no additional params)', async () => {
        const movieList: TopRatedMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getTopRatedMovieList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/top_rated`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });

      it('should return top rated movie list (case: all possible params)', async () => {
        const movieList: TopRatedMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const queryData: PageOption & LanguageOption & RegionOption = {
          language: 'br-FR',
          page: 1,
          region: 'US',
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getTopRatedMovieList(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/top_rated?${params.toString()}`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });
    });

    describe('getUpcomingMovieList', () => {
      it('should return upcoming movie list (case: no additional params)', async () => {
        const movieList: UpcomingMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getUpcomingMovieList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/upcoming`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });

      it('should return upcoming movie list (case: all possible params)', async () => {
        const movieList: UpcomingMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 200,
        };
        const queryData: PageOption & LanguageOption & RegionOption = {
          language: 'br-FR',
          page: 1,
          region: 'US',
        };
        const movieListPromise = firstValueFrom(tmdbApiService.getUpcomingMovieList(queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/upcoming?${params.toString()}`,
        });

        req.flush(movieList);

        const result = await movieListPromise;
        expect(result).toEqual(movieList);
      });
    });
  });

  describe('movies', () => {
    describe('getDetailsById', () => {
      it('should return movie details (case: no additional params)', async () => {
        const id = 1;
        const movieDetails: AppendToResponse<
          MovieDetails,
          AppendToResponseMovieKey[] | undefined,
          'movie'
        > = {
          id,
          title: 'Fight Club',
          original_title: 'Fight Club',
          overview: 'A ticking-time bomb insomniac...',
          poster_path: '/poster_path.jpg',
          backdrop_path: '/backdrop_path.jpg',
          release_date: '1999-10-15',
          status: 'Released',
          tagline: 'Mischief. Mayhem. Soap.',
          adult: false,
          budget: 63000000,
          revenue: 100853753,
          runtime: 139,
          popularity: 0.5,
          vote_average: 8.4,
          vote_count: 24500,
          video: false,
          original_language: 'en',
          homepage: 'http://movies/fight-club',
          imdb_id: 'tt0137523',
          genres: [],
          production_companies: [],
          production_countries: [],
          spoken_languages: [],
          credits: {
            cast: [],
            crew: [],
          },
          videos: {
            results: [],
          },
          images: {
            backdrops: [],
            posters: [],
            logos: [],
          },
        };
        const movieDetailsPromise = firstValueFrom(tmdbApiService.getDetailsById(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}`,
        });

        req.flush(movieDetails);

        const result = await movieDetailsPromise;
        expect(result).toEqual(movieDetails);
      });

      it('should return movie details (case: all possible params)', async () => {
        const id = 1;
        const movieDetails: AppendToResponse<
          MovieDetails,
          AppendToResponseMovieKey[] | undefined,
          'movie'
        > = {
          id,
          title: 'Fight Club',
          original_title: 'Fight Club',
          overview: 'A ticking-time bomb insomniac...',
          poster_path: '/poster_path.jpg',
          backdrop_path: '/backdrop_path.jpg',
          release_date: '1999-10-15',
          status: 'Released',
          tagline: 'Mischief. Mayhem. Soap.',
          adult: false,
          budget: 63000000,
          revenue: 100853753,
          runtime: 139,
          popularity: 0.5,
          vote_average: 8.4,
          vote_count: 24500,
          video: false,
          original_language: 'en',
          homepage: 'http://movies/fight-club',
          imdb_id: 'tt0137523',
          genres: [],
          production_companies: [],
          production_countries: [],
          spoken_languages: [],
          credits: {
            cast: [],
            crew: [],
          },
          videos: {
            results: [],
          },
          images: {
            backdrops: [],
            posters: [],
            logos: [],
          },
        };
        const appendToResponse: AppendToResponseMovieKey[] = ['credits'];
        const queryData: LanguageOption = {
          language: 'br-FR',
        };
        const movieDetailsPromise = firstValueFrom(
          tmdbApiService.getDetailsById(id, appendToResponse, queryData),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}?${params.toString()}&append_to_response=credits`,
        });

        req.flush(movieDetails);

        const result = await movieDetailsPromise;
        expect(result).toEqual(movieDetails);
      });
    });

    describe('getMovieCredits', () => {
      it('should return movie credit (case: no additional params)', async () => {
        const id = 1;
        const movieCredits: Credits = {
          id,
          cast: [],
          crew: [],
        };
        const movieCreditsPromise = firstValueFrom(tmdbApiService.getMovieCredits(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/credits`,
        });

        req.flush(movieCredits);

        const result = await movieCreditsPromise;
        expect(result).toEqual(movieCredits);
      });

      it('should return movie credit (case: all possible params)', async () => {
        const id = 1;
        const movieCredits: Credits = {
          id,
          cast: [],
          crew: [],
        };
        const queryData: LanguageOption = {
          language: 'br-FR',
        };
        const movieCreditsPromise = firstValueFrom(tmdbApiService.getMovieCredits(id, queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/credits?${params.toString()}`,
        });

        req.flush(movieCredits);

        const result = await movieCreditsPromise;
        expect(result).toEqual(movieCredits);
      });
    });

    describe('getMovieExternalIds', () => {
      it('should return movie external ids', async () => {
        const id = 1;
        const externalIds: ExternalIds = {
          imdb_id: 'imdb_id',
          facebook_id: 'facebook_id',
          instagram_id: 'instagram_id',
          twitter_id: 'twitter_id',
          wikidata_id: 'wikidata_id',
          id,
        };
        const externalIdsPromise = firstValueFrom(tmdbApiService.getMovieExternalIds(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/external_ids`,
        });

        req.flush(externalIds);

        const result = await externalIdsPromise;
        expect(result).toEqual(externalIds);
      });
    });

    describe('getMovieImages', () => {
      it('should return movie images (case: no additional params)', async () => {
        const id = 1;
        const movieImages: Images = {
          id,
          backdrops: [],
          logos: [],
          posters: [],
        };
        const movieImagesPromise = firstValueFrom(tmdbApiService.getMovieImages(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/images`,
        });

        req.flush(movieImages);

        const result = await movieImagesPromise;
        expect(result).toEqual(movieImages);
      });

      it('should return movie images (case: all possible params)', async () => {
        const id = 1;
        const movieImages: Images = {
          id,
          backdrops: [],
          logos: [],
          posters: [],
        };
        const queryData: MoviesImageSearchOptions = {
          language: 'br-FR',
          include_image_language: ['af-ZA'],
        };
        const movieImagesPromise = firstValueFrom(tmdbApiService.getMovieImages(id, queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/images?${params.toString()}`,
        });

        req.flush(movieImages);

        const result = await movieImagesPromise;
        expect(result).toEqual(movieImages);
      });
    });

    describe('getMovieRecommendations', () => {
      it('should return movie recommendations (case: no additional params)', async () => {
        const id = 1;
        const movieRecommendations: Recommendations = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const recommendationsPromise = firstValueFrom(tmdbApiService.getMovieRecommendations(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/recommendations`,
        });

        req.flush(movieRecommendations);

        const result = await recommendationsPromise;
        expect(result).toEqual(movieRecommendations);
      });

      it('should return movie recommendations (case: all possible params)', async () => {
        const id = 1;
        const movieRecommendations: Recommendations = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: LanguageOption & PageOption = {
          language: 'br-FR',
          page: 1,
        };
        const movieRecommendationsPromise = firstValueFrom(
          tmdbApiService.getMovieRecommendations(id, queryData),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/recommendations?${params.toString()}`,
        });

        req.flush(movieRecommendations);

        const result = await movieRecommendationsPromise;
        expect(result).toEqual(movieRecommendations);
      });
    });

    describe('getMovieReviews', () => {
      it('should return movie reviews (case: no additional params)', async () => {
        const id = 1;
        const movieReviews: Reviews = {
          id,
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const reviewsPromise = firstValueFrom(tmdbApiService.getMovieReviews(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/reviews`,
        });

        req.flush(movieReviews);

        const result = await reviewsPromise;
        expect(result).toEqual(movieReviews);
      });

      it('should return movie reviews (case: all possible params)', async () => {
        const id = 1;
        const movieReviews: Reviews = {
          id,
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: LanguageOption & PageOption = {
          language: 'br-FR',
          page: 1,
        };
        const reviewsPromise = firstValueFrom(tmdbApiService.getMovieReviews(id, queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/reviews?${params.toString()}`,
        });

        req.flush(movieReviews);

        const result = await reviewsPromise;
        expect(result).toEqual(movieReviews);
      });
    });

    describe('getMoviesSimilar', () => {
      it('should return similar movies (case: no additional params)', async () => {
        const id = 1;
        const similarMovies: SimilarMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const similarMoviesPromise = firstValueFrom(tmdbApiService.getMoviesSimilar(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/similar`,
        });

        req.flush(similarMovies);

        const result = await similarMoviesPromise;
        expect(result).toEqual(similarMovies);
      });

      it('should return similar movies (case: all possible params)', async () => {
        const id = 1;
        const similarMovies: SimilarMovies = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: LanguageOption & PageOption = {
          language: 'br-FR',
          page: 1,
        };
        const similarMoviesPromise = firstValueFrom(tmdbApiService.getMoviesSimilar(id, queryData));

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/movie/${id}/similar?${params.toString()}`,
        });

        req.flush(similarMovies);

        const result = await similarMoviesPromise;
        expect(result).toEqual(similarMovies);
      });
    });
  });

  describe('people list', () => {
    describe('getPeopleListOrderedByPopularity', () => {
      it('should return people list (case: no additional params)', async () => {
        const peopleList: PopularPeople = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const peopleListPromise = firstValueFrom(tmdbApiService.getPeopleListOrderedByPopularity());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/person/popular`,
        });

        req.flush(peopleList);

        const result = await peopleListPromise;
        expect(result).toEqual(peopleList);
      });

      it('should return people list (case: all possible params)', async () => {
        const peopleList: PopularPeople = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: LanguageOption & PageOption = {
          language: 'br-FR',
          page: 1,
        };
        const peopleListPromise = firstValueFrom(
          tmdbApiService.getPeopleListOrderedByPopularity(queryData),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/person/popular?${params.toString()}`,
        });

        req.flush(peopleList);

        const result = await peopleListPromise;
        expect(result).toEqual(peopleList);
      });
    });
  });

  describe('people', () => {
    describe('getPersonDetails', () => {
      it('should return person details (case: no additional params)', async () => {
        const id = 1;
        const personDetails: AppendToResponse<
          PersonDetails,
          AppendToResponsePersonKey[] | undefined,
          'person'
        > = {
          birthday: '1990-01-01',
          known_for_department: 'Acting',
          id,
          deathday: '',
          name: 'John',
          also_known_as: [],
          gender: 2,
          biography: 'A sample biography.',
          popularity: 10.5,
          place_of_birth: 'London, UK',
          profile_path: '/path.jpg',
          adult: false,
          imdb_id: 'imdb_id',
          homepage: 'https://example.com',
        };
        const personDetailsPromise = firstValueFrom(tmdbApiService.getPersonDetails(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/person/${id}`,
        });

        req.flush(personDetails);

        const result = await personDetailsPromise;
        expect(result).toEqual(personDetails);
      });

      it('should return person details (case: all possible params)', async () => {
        const id = 1;
        const personDetails: AppendToResponse<
          PersonDetails,
          AppendToResponsePersonKey[] | undefined,
          'person'
        > = {
          birthday: '1990-01-01',
          known_for_department: 'Acting',
          id,
          deathday: '',
          name: 'John',
          also_known_as: [],
          gender: 2,
          biography: 'A sample biography.',
          popularity: 10.5,
          place_of_birth: 'London, UK',
          profile_path: '/path.jpg',
          adult: false,
          imdb_id: 'imdb_id',
          homepage: 'https://example.com',
        };
        const appendToResponse: AppendToResponsePersonKey[] = ['movie_credits'];
        const queryData: LanguageOption = {
          language: 'br-FR',
        };
        const personDetailsPromise = firstValueFrom(
          tmdbApiService.getPersonDetails(id, appendToResponse, queryData.language),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/person/${id}?${params.toString()}&append_to_response=movie_credits`,
        });

        req.flush(personDetails);

        const result = await personDetailsPromise;
        expect(result).toEqual(personDetails);
      });
    });
  });

  describe('reviews', () => {
    describe('getMovieOrTVShowReviewDetails', () => {
      it('should return review details', async () => {
        const id = 'id';
        const reviewDetails: ReviewDetails = {
          iso_639_1: 'iso_639_1',
          media_id: 123,
          media_title: 12,
          media_type: 1,
          author: 'Author',
          author_details: {
            name: 'John',
            username: 'username',
            avatar_path: 'avatar_path',
          },
          content: 'content',
          created_at: '2000-01-01',
          id,
          updated_at: '2000-01-01',
          url: 'http://path',
        };
        const reviewDetailsPromise = firstValueFrom(
          tmdbApiService.getMovieOrTVShowReviewDetails(id),
        );

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/review/${id}`,
        });

        req.flush(reviewDetails);

        const result = await reviewDetailsPromise;
        expect(result).toEqual(reviewDetails);
      });
    });
  });

  describe('search', () => {
    describe('searchCollections', () => {
      it('should return collection', async () => {
        const collection: Search<Collection> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: SearchOptions = {
          query: 'smth',
          page: 1,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const collectionPromise = firstValueFrom(tmdbApiService.searchCollections(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/collection?${params.toString()}`,
        });

        req.flush(collection);

        const result = await collectionPromise;
        expect(result).toEqual(collection);
      });
    });

    describe('searchCompanies', () => {
      it('should return companies', async () => {
        const companies: Search<Company> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: SearchOptions = {
          query: 'smth',
          page: 1,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const companiesPromise = firstValueFrom(tmdbApiService.searchCompanies(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/company?${params.toString()}`,
        });

        req.flush(companies);

        const result = await companiesPromise;
        expect(result).toEqual(companies);
      });
    });

    describe('searchKeywordId', () => {
      it('should return keyword id', async () => {
        const keywordId: Search<{ id: string; name: string }> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: SearchOptions = {
          query: 'smth',
          page: 1,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const keywordIdPromise = firstValueFrom(tmdbApiService.searchKeywordId(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/keyword?${params.toString()}`,
        });

        req.flush(keywordId);

        const result = await keywordIdPromise;
        expect(result).toEqual(keywordId);
      });
    });

    describe('searchMovies', () => {
      it('should return movie', async () => {
        const movie: Search<Movie> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: MovieSearchOptions = {
          query: 'smth',
          page: 1,
          language: 'br-FR',
          include_adult: false,
          year: 2020,
          primary_release_year: 2020,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const moviePromise = firstValueFrom(tmdbApiService.searchMovies(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/movie?${params.toString()}`,
        });

        req.flush(movie);

        const result = await moviePromise;
        expect(result).toEqual(movie);
      });
    });

    describe('searchMulti', () => {
      it('should return multi search result', async () => {
        const multiSearchResult: Search<MultiSearchResult> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: MultiSearchOptions = {
          query: 'smth',
          page: 1,
          language: 'br-FR',
          include_adult: false,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const multiSearchResultPromise = firstValueFrom(tmdbApiService.searchMulti(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/multi?${params.toString()}`,
        });

        req.flush(multiSearchResult);

        const result = await multiSearchResultPromise;
        expect(result).toEqual(multiSearchResult);
      });
    });

    describe('searchPerson', () => {
      it('should return person', async () => {
        const person: Search<Person> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: PeopleSearchOptions = {
          query: 'smth',
          page: 1,
          language: 'br-FR',
          include_adult: false,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const personPromise = firstValueFrom(tmdbApiService.searchPerson(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/person?${params.toString()}`,
        });

        req.flush(person);

        const result = await personPromise;
        expect(result).toEqual(person);
      });
    });

    describe('searchTvShow', () => {
      it('should return tv show', async () => {
        const tvShow: Search<TV> = {
          page: 1,
          results: [],
          total_pages: 10,
          total_results: 1000,
        };
        const queryData: TvSearchOptions = {
          query: 'smth',
          page: 1,
          language: 'br-FR',
          include_adult: false,
        };

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const tvShowPromise = firstValueFrom(tmdbApiService.searchTvShow(queryData));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/search/tv?${params.toString()}`,
        });

        req.flush(tvShow);

        const result = await tvShowPromise;
        expect(result).toEqual(tvShow);
      });
    });
  });

  describe('TV series lists', () => {
    describe('getPopularTvShowsList', () => {
      it('should return popular tv show list (case: no additional params)', async () => {
        const popularTvShows: PopularTvShows = {
          page: 1,
          results: [],
          total_results: 200,
          total_pages: 5,
        };
        const popularTvShowsPromise = firstValueFrom(tmdbApiService.getPopularTvShowsList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/popular`,
        });

        req.flush(popularTvShows);

        const result = await popularTvShowsPromise;
        expect(result).toEqual(popularTvShows);
      });

      it('should return popular tv show list (case: all possible params)', async () => {
        const popularTvShows: PopularTvShows = {
          page: 1,
          results: [],
          total_results: 200,
          total_pages: 5,
        };
        const queryData: PageOption & LanguageOption = {
          language: 'br-FR',
          page: 1,
        };
        const popularTvShowsPromise = firstValueFrom(
          tmdbApiService.getPopularTvShowsList(queryData),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/popular?${params.toString()}`,
        });

        req.flush(popularTvShows);

        const result = await popularTvShowsPromise;
        expect(result).toEqual(popularTvShows);
      });
    });

    describe('getTopRatedTvShowsList', () => {
      it('should return top rated tv show list (case: no additional params)', async () => {
        const topRatedTvShows: TopRatedTvShows = {
          page: 1,
          results: [],
          total_results: 200,
          total_pages: 5,
        };
        const topRatedTvShowsPromise = firstValueFrom(tmdbApiService.getTopRatedTvShowsList());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/top_rated`,
        });

        req.flush(topRatedTvShows);

        const result = await topRatedTvShowsPromise;
        expect(result).toEqual(topRatedTvShows);
      });

      it('should return top rated tv show list (case: all possible params)', async () => {
        const topRatedTvShows: TopRatedTvShows = {
          page: 1,
          results: [],
          total_results: 200,
          total_pages: 5,
        };
        const queryData: PageOption & LanguageOption = {
          language: 'br-FR',
          page: 1,
        };
        const topRatedTvShowsPromise = firstValueFrom(
          tmdbApiService.getTopRatedTvShowsList(queryData),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/top_rated?${params.toString()}`,
        });

        req.flush(topRatedTvShows);

        const result = await topRatedTvShowsPromise;
        expect(result).toEqual(topRatedTvShows);
      });
    });
  });

  describe('TV series', () => {
    describe('getTvShowDetails', () => {
      it('should return tv show details (case: no additional params)', async () => {
        const id = 1;
        const tvShowDetails: AppendToResponse<
          TvShowDetails,
          AppendToResponseTvKey[] | undefined,
          'tvShow'
        > = {
          backdrop_path: '/path_to_backdrop.jpg',
          created_by: [],
          episode_run_time: [45],
          first_air_date: '2020-01-01',
          genres: [{ id: 18, name: 'Drama' }],
          homepage: 'https://www.example.com',
          id,
          in_production: true,
          languages: ['en'],
          last_air_date: '2023-05-10',
          last_episode_to_air: {
            air_date: '2023-05-10',
            episode_number: 10,
            id: 98765,
            name: 'Season Finale',
            overview: 'The epic conclusion.',
            production_code: '',
            season_number: 1,
            still_path: '/still.jpg',
            vote_average: 8.5,
            vote_count: 100,
          },
          name: 'Example TV Show',
          networks: [],
          number_of_episodes: 10,
          number_of_seasons: 1,
          origin_country: ['US'],
          original_language: 'en',
          original_name: 'Example TV Show',
          overview: 'A description of the TV show.',
          popularity: 125.5,
          poster_path: '/path_to_poster.jpg',
          production_companies: [],
          production_countries: [],
          seasons: [],
          spoken_languages: [],
          status: 'Returning Series',
          tagline: 'Believe the hype.',
          type: 'Scripted',
          vote_average: 8.1,
          vote_count: 500,
        };
        const tvShowDetailsPromise = firstValueFrom(tmdbApiService.getTvShowDetails(id));

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/${id}`,
        });

        req.flush(tvShowDetails);

        const result = await tvShowDetailsPromise;
        expect(result).toEqual(tvShowDetails);
      });

      it('should return tv show details (case: all possible params)', async () => {
        const id = 1;
        const tvShowDetails: AppendToResponse<
          TvShowDetails,
          AppendToResponseTvKey[] | undefined,
          'tvShow'
        > = {
          backdrop_path: '/path_to_backdrop.jpg',
          created_by: [],
          episode_run_time: [45],
          first_air_date: '2020-01-01',
          genres: [{ id: 18, name: 'Drama' }],
          homepage: 'https://www.example.com',
          id: 12345,
          in_production: true,
          languages: ['en'],
          last_air_date: '2023-05-10',
          last_episode_to_air: {
            air_date: '2023-05-10',
            episode_number: 10,
            id: 98765,
            name: 'Season Finale',
            overview: 'The epic conclusion.',
            production_code: '',
            season_number: 1,
            still_path: '/still.jpg',
            vote_average: 8.5,
            vote_count: 100,
          },
          name: 'Example TV Show',
          networks: [],
          number_of_episodes: 10,
          number_of_seasons: 1,
          origin_country: ['US'],
          original_language: 'en',
          original_name: 'Example TV Show',
          overview: 'A description of the TV show.',
          popularity: 125.5,
          poster_path: '/path_to_poster.jpg',
          production_companies: [],
          production_countries: [],
          seasons: [],
          spoken_languages: [],
          status: 'Returning Series',
          tagline: 'Believe the hype.',
          type: 'Scripted',
          vote_average: 8.1,
          vote_count: 500,
        };
        const appendToResponse: AppendToResponseTvKey[] = ['credits'];
        const queryData: LanguageOption = {
          language: 'br-FR',
        };
        const tvShowDetailsPromise = firstValueFrom(
          tmdbApiService.getTvShowDetails(id, appendToResponse, queryData.language),
        );

        const params = new URLSearchParams();
        Object.entries(queryData).forEach(([key, value]) => {
          params.set(key, value);
        });

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/tv/${id}?${params.toString()}&append_to_response=credits`,
        });

        req.flush(tvShowDetails);

        const result = await tvShowDetailsPromise;
        expect(result).toEqual(tvShowDetails);
      });
    });
  });

  describe('configuration', () => {
    describe('getTmdbApiConfiguration', () => {
      it('should return configuration', async () => {
        const config: Configuration = {
          images: {
            base_url: 'base_url',
            secure_base_url: 'secure_base_url',
            backdrop_sizes: [],
            logo_sizes: [],
            poster_sizes: [],
            profile_sizes: [],
            still_sizes: [],
          },
          change_keys: [],
        };
        const configPromise = firstValueFrom(tmdbApiService.getTmdbApiConfiguration());

        const req = httpTesting.expectOne({
          method: 'GET',
          url: `${baseUrl}/configuration`,
        });

        req.flush(config);

        const result = await configPromise;
        expect(result).toEqual(config);
      });
    });
  });
});
