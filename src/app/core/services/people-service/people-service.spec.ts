import { TestBed } from '@angular/core/testing';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { PeopleService } from './people-service';
import { TmdbApiService } from '../tmdb-api.service';
import { TmdbImageService } from '../tmdb-image.service';
import { PersonI } from './people.model';

describe('PeopleService', () => {
  let service: PeopleService;
  let tmdbApiMock: Partial<TmdbApiService>;
  let tmdbImageServiceMock: Partial<TmdbImageService>;

  const mockPeople = [
    {
      id: 1,
      original_name: 'John Doe',
      profile_path: '/path/to/profile1.jpg',
    },
    {
      id: 2,
      original_name: 'Jane Smith',
      profile_path: '/path/to/profile2.jpg',
    },
  ];

  const mockPeopleResponse = {
    results: mockPeople,
    total_pages: 50,
    page: 1,
  };

  const mockPersonDetails = {
    id: 1,
    name: 'John Doe',
    profile_path: '/path/to/profile1.jpg',
    biography: 'A famous actor',
    birthday: '1990-01-15',
    deathday: null,
  };

  const waitForAsync = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

  beforeEach(() => {
    tmdbApiMock = {
      getPeopleListOrderedByPopularity: vi
        .fn()
        .mockReturnValue(of(mockPeopleResponse)),
      getPersonDetails: vi
        .fn()
        .mockReturnValue(of(mockPersonDetails)),
    };

    tmdbImageServiceMock = {
      buildImageUrl: vi.fn((config: { path: string; size: string }) =>
        `https://image.tmdb.org/t/p/${config.size}${config.path}`
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        PeopleService,
        { provide: TmdbApiService, useValue: tmdbApiMock },
        { provide: TmdbImageService, useValue: tmdbImageServiceMock },
      ],
    });

    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should initialize with empty people array', () => {
      expect(service.people()).toEqual([]);
    });

    it('should initialize with empty search results', () => {
      expect(service.searchPeopleResults()).toEqual([]);
    });

    it('should initialize with false loading state', () => {
      expect(service.isLoading()).toBe(false);
    });

    it('should initialize with null error', () => {
      expect(service.peopleError()).toBeNull();
    });

    it('should initialize with null active person', () => {
      expect(service.activePerson()).toBeNull();
    });

    it('should initialize with zero pages length', () => {
      expect(service.pagesLength()).toBe(0);
    });

    it('should have pageSize of 20', () => {
      expect(service.pageSize).toBe(20);
    });
  });

  describe('loadPeople', () => {
    it('should set isLoading to true', () => {
      service.loadPeople();

      expect(service.isLoading()).toBe(false);
    });

    it('should clear previous errors', () => {
      service.peopleError.set('Previous error');
      service.loadPeople();

      expect(service.peopleError()).toBeNull();
    });

    it('should call API with default page 1', () => {
      service.loadPeople();

      expect(tmdbApiMock.getPeopleListOrderedByPopularity).toHaveBeenCalledWith({
        page: 1,
      });
    });

    it('should call API with specified page', () => {
      service.loadPeople(5);

      expect(tmdbApiMock.getPeopleListOrderedByPopularity).toHaveBeenCalledWith({
        page: 5,
      });
    });

    it('should map and set people correctly', async () => {
      service.loadPeople();
      await waitForAsync();
      expect(service.people().length).toBe(2);
      expect(service.people()[0].id).toBe(1);
      expect(service.people()[0].name).toBe('John Doe');
      expect(service.people()[1].id).toBe(2);
      expect(service.people()[1].name).toBe('Jane Smith');
    });

    it('should build image URLs for people', async () => {
      service.loadPeople();
      await waitForAsync();
      expect(tmdbImageServiceMock.buildImageUrl).toHaveBeenCalledWith({
        path: '/path/to/profile1.jpg',
        size: 'w500',
      });
      expect(tmdbImageServiceMock.buildImageUrl).toHaveBeenCalledWith({
        path: '/path/to/profile2.jpg',
        size: 'w500',
      });
    });

    it('should set pagesLength from response', async () => {
      service.loadPeople();
      await waitForAsync();
      expect(service.pagesLength()).toBe(50);
    });

    it('should set isLoading to false on success', async () => {
      service.loadPeople();
      await waitForAsync();
      expect(service.isLoading()).toBe(false);
    });

    it('should handle API error', async () => {
      const errorMessage = 'Network error';
      tmdbApiMock.getPeopleListOrderedByPopularity = vi
        .fn()
        .mockReturnValue(throwError(() => new Error(errorMessage)));

      service.loadPeople();
      await waitForAsync();
      expect(service.peopleError()).toBe(errorMessage);
      expect(service.isLoading()).toBe(false);
    });

    it('should handle API error with generic message', async () => {
      const error = new Error();
      (error as Error).message = '';
      tmdbApiMock.getPeopleListOrderedByPopularity = vi
        .fn()
        .mockReturnValue(throwError(() => error));

      service.loadPeople();
      await waitForAsync();
      expect(service.peopleError()).toBe('Failed to load people');
    });
  });

  describe('saveSearchPeopleResults', () => {
    it('should save search results with all properties', () => {
      const results: PersonI[] = [
        {
          id: 1,
          name: 'Actor 1',
          profile_path: 'path1',
          bio: 'Bio 1',
          dateOfBirth: '1990-01-01',
        },
        {
          id: 2,
          name: 'Actor 2',
          profile_path: 'path2',
          bio: 'Bio 2',
          dateOfBirth: '1995-05-05',
        },
      ];

      service.saveSearchPeopleResults(results);

      const saved = service.searchPeopleResults();
      expect(saved.length).toBe(2);
      expect(saved[0]).toEqual({
        id: 1,
        name: 'Actor 1',
        profile_path: 'path1',
      });
      expect(saved[1]).toEqual({
        id: 2,
        name: 'Actor 2',
        profile_path: 'path2',
      });
    });

    it('should exclude bio and dateOfBirth from saved results', () => {
      const results: PersonI[] = [
        {
          id: 1,
          name: 'Actor 1',
          profile_path: 'path1',
          bio: 'Biography',
          dateOfBirth: '1990-01-01',
        },
      ];

      service.saveSearchPeopleResults(results);

      const saved = service.searchPeopleResults()[0];
      expect(saved).not.toHaveProperty('bio');
      expect(saved).not.toHaveProperty('dateOfBirth');
      expect(saved).not.toHaveProperty('dateOfDead');
    });

    it('should handle empty results', () => {
      service.saveSearchPeopleResults([]);

      expect(service.searchPeopleResults()).toEqual([]);
    });

    it('should replace previous search results', () => {
      const results1: PersonI[] = [
        { id: 1, name: 'Actor 1', profile_path: 'path1' },
      ];
      const results2: PersonI[] = [
        { id: 2, name: 'Actor 2', profile_path: 'path2' },
        { id: 3, name: 'Actor 3', profile_path: 'path3' },
      ];

      service.saveSearchPeopleResults(results1);
      expect(service.searchPeopleResults().length).toBe(1);

      service.saveSearchPeopleResults(results2);
      expect(service.searchPeopleResults().length).toBe(2);
      expect(service.searchPeopleResults()[0].id).toBe(2);
    });
  });

  describe('savePersonDetail', () => {
    it('should set isLoading to true', () => {
      service.savePersonDetail(1);

      expect(service.isLoading()).toBe(false);
    });

    it('should clear previous errors', () => {
      service.peopleError.set('Previous error');
      service.savePersonDetail(1);

      expect(service.peopleError()).toBeNull();
    });

    it('should call API with correct person ID', () => {
      service.savePersonDetail(5);

      expect(tmdbApiMock.getPersonDetails).toHaveBeenCalledWith(5);
    });

    it('should map and set person details correctly', async () => {
      service.savePersonDetail(1);
      await waitForAsync();
      const person = service.activePerson();
      expect(person).not.toBeNull();
      expect(person?.id).toBe(1);
      expect(person?.name).toBe('John Doe');
      expect(person?.bio).toBe('A famous actor');
      expect(person?.dateOfBirth).toBe('1990-01-15');
      expect(person?.dateOfDead).toBeNull();
    });

    it('should build image URL for person detail', async () => {
      service.savePersonDetail(1);
      await waitForAsync();
      expect(tmdbImageServiceMock.buildImageUrl).toHaveBeenCalledWith({
        path: '/path/to/profile1.jpg',
        size: 'w500',
      });
    });

    it('should set isLoading to false on success', async () => {
      service.savePersonDetail(1);
      await waitForAsync();
      expect(service.isLoading()).toBe(false);
    });

    it('should handle API error', async () => {
      const errorMessage = 'Person not found';
      tmdbApiMock.getPersonDetails = vi
        .fn()
        .mockReturnValue(throwError(() => new Error(errorMessage)));

      service.savePersonDetail(1);
      await waitForAsync();
      expect(service.peopleError()).toBe(errorMessage);
      expect(service.isLoading()).toBe(false);
      expect(service.activePerson()).toBeNull();
    });

    it('should handle API error with generic message', async () => {
      const error = new Error();
      (error as Error).message = '';
      tmdbApiMock.getPersonDetails = vi
        .fn()
        .mockReturnValue(throwError(() => error));

      service.savePersonDetail(1);
      await waitForAsync();
      expect(service.peopleError()).toBe('Failed to load person details');
    });
  });

  describe('removePersonDetail', () => {
    it('should clear active person', () => {
      service.activePerson.set({
        id: 1,
        name: 'John Doe',
        profile_path: 'path',
      });

      service.removePersonDetail();

      expect(service.activePerson()).toBeNull();
    });

    it('should clear active person when already null', () => {
      service.activePerson.set(null);

      service.removePersonDetail();

      expect(service.activePerson()).toBeNull();
    });
  });
});
