import { inject, Injectable, signal } from '@angular/core';
import { TmdbApiService } from '../tmdb-api.service';
import { tapResponse } from '@ngrx/operators';
import { PersonI } from './people.model';
import { TmdbImageService } from '../tmdb-image.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  public tmdbApi = inject(TmdbApiService);
  public tmdbImageService = inject(TmdbImageService);
  public people = signal<PersonI[]>([]);
  public searchPeopleResults = signal<PersonI[]>([]);
  public isLoading = signal(false);
  public peopleError = signal<string | null>(null);
  public activePerson = signal<PersonI | null>(null);
  public pagesLength = signal(0);
  public pageSize = 20;

  loadPeople(page = 1) {
    this.isLoading.set(true);
    this.peopleError.set(null);

    this.tmdbApi
      .getPeopleListOrderedByPopularity({ page })
      .pipe(
        tapResponse({
          next: (response) => {
            this.pagesLength.set(response.total_pages);
            const mappedPeople = response.results.map((person) => ({
              id: person.id,
              name: person.original_name,
              profile_path: this.tmdbImageService.buildImageUrl({
                path: person.profile_path,
                size: 'w500',
              }),
            }));
            this.people.set(mappedPeople);
            this.isLoading.set(false);
          },
          error: (error: Error) => {
            this.peopleError.set(error.message || 'Failed to load people');
            this.isLoading.set(false);
          },
        }),
      )
      .subscribe();
  }

  saveSearchPeopleResults(results: PersonI[] | []) {
    this.searchPeopleResults.set(
      results.map((item) => ({
        id: item.id,
        name: item.name,
        profile_path: item.profile_path,
      })),
    );
  }

  savePersonDetail(id: number) {
    this.isLoading.set(true);
    this.peopleError.set(null);
    this.tmdbApi
      .getPersonDetails(id)
      .pipe(
        tapResponse({
          next: (response) => {
            this.activePerson.set({
              id: response.id,
              name: response.name,
              profile_path: this.tmdbImageService.buildImageUrl({
                path: response.profile_path,
                size: 'w500',
              }),
              bio: response.biography,
              dateOfBirth: response.birthday,
              dateOfDead: response.deathday,
            });
            this.isLoading.set(false);
          },

          error: (error: Error) => {
            this.peopleError.set(error.message || 'Failed to load person details');
            this.isLoading.set(false);
          },
        }),
      )
      .subscribe();
  }

  removePersonDetail() {
    this.activePerson.set(null);
  }
}
