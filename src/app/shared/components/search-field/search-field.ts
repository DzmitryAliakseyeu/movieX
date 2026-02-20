import { Component, computed, inject, signal, OnInit, input, DestroyRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';
import { Store } from '../../../core/store/store';
import { RouterLink } from '@angular/router';
import { PeopleService } from '../../../core/services/people-service/people-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'moviex-search-field',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField implements OnInit {
  private http = inject(TmdbApiService);
  private store = inject(Store);
  private peopleService = inject(PeopleService);
  private destroyRef = inject(DestroyRef);
  protected isFocusOnInput = signal(false);
  protected searchControl = new FormControl('');
  protected searchPostersResults = computed(() => this.store.searchPostersResults());
  protected searchPeopleResults = computed(() => this.peopleService.searchPeopleResults());
  public id = input();

  ngOnInit() {
    this.store.saveSearchPostersResults([]);
    this.peopleService.saveSearchPeopleResults([]);

    if (this.id() === 'multi') {
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef),
          switchMap((query) => {
            if (query && query.length > 0) {
              return this.http.searchMulti({ query });
            }
            return of({ results: [] });
          }),
        )
        .subscribe({
          next: (response) => {
            this.peopleService.saveSearchPeopleResults([]);
            if (!response.results.length) {
              this.store.saveSearchPostersResults([]);
            }
            const result = response.results
              .map((item) => {
                if (item.media_type === 'movie') {
                  return {
                    id: item.id,
                    title: item.title,
                    date: item.release_date,
                  };
                } else if (item.media_type === 'tv') {
                  return {
                    id: item.id,
                    title: item.name,
                    date: item.first_air_date,
                  };
                }

                return null;
              })
              .filter((item) => item !== null);
            if (result.length) {
              this.store.saveSearchPostersResults(result);
            }
          },
        });
      return;
    }

    if (this.id() === 'people') {
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef),
          switchMap((query) => {
            if (query && query.length > 0) {
              return this.http.searchPerson({ query });
            }
            return of({ results: [] });
          }),
        )
        .subscribe({
          next: (response) => {
            this.store.saveSearchPostersResults([]);
            if (!response.results.length) {
              this.peopleService.saveSearchPeopleResults([]);
            }
            const result = response.results
              .map((item) => {
                return {
                  id: item.id,
                  name: item.original_name,
                  profile_path: item.profile_path,
                };
              })
              .filter((item) => item !== null);
            if (result.length) {
              this.peopleService.saveSearchPeopleResults(result);
            }
          },
        });
      return;
    }
  }

  onFocus() {
    this.isFocusOnInput.set(true);
  }

  onBlur() {
    setTimeout(() => this.isFocusOnInput.set(false), 150);
  }

  showInfo(id: number) {
    this.peopleService.savePersonDetail(id);
  }
}
