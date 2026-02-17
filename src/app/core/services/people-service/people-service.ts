import { inject, Injectable, signal } from '@angular/core';
import { TmdbApiService } from '../tmdb-api.service';
import { tapResponse } from '@ngrx/operators';
import { PersonI } from './people.model';
import { TmdbImageService } from '../tmdb-image.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  people = signal<PersonI[]>([]);
  searchPeopleResults = signal<PersonI[]>([]);
  peopleLoading = signal(false);
  peopleError = signal<string | null>(null);
  tmdbApi = inject(TmdbApiService);
  TmdbImageService = inject(TmdbImageService);
  activePerson = signal<PersonI | null>(null);

  loadPeople() {
    this.peopleLoading.set(true);
    this.peopleError.set(null);

    this.tmdbApi
      .getPeopleListOrderedByPopularity()
      .pipe(
        tapResponse({
          next: (response) => {
            this.people.set(
              response.results.map((person) => ({
                id: person.id,
                name: person.original_name,
                profile_path: `https://image.tmdb.org/t/p/w500${person.profile_path}`,
              })),
            );
            this.peopleLoading.set(false);
          },
          error: (error: Error) => {
            this.peopleError.set(error.message || 'Failed to load people');
            this.peopleLoading.set(false);
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
    this.tmdbApi
      .getPersonDetails(id)
      .pipe(
        tapResponse({
          next: (response) => {
            this.activePerson.set({
              id: response.id,
              name: response.name,
              profile_path: `https://image.tmdb.org/t/p/w500${response.profile_path}`,
              bio: response.biography,
              dateOfBirth: response.birthday,
              dateOfDead: response.deathday,
            });
          },

          error: (error: Error) => {
            console.error('Failed to load person details:', error);
          },
        }),
      )
      .subscribe();
  }

  removePersonDetail() {
    this.activePerson.set(null);
  }

  //   saveSearchPeopleResults(results: PersonI[] | []) {
  //   patchState(store, {
  //     searchPostersResults: [],
  //     searchPeopleResults: results.map((item) => ({
  //       id: item.id,
  //       name: item.name,
  //       profile_path: item.profile_path,
  //     })),
  //   });
  // },
}
