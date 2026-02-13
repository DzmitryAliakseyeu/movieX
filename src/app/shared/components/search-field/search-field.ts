import { Component, computed, inject, signal, OnInit, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';
import { Store } from '../../../core/store/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'moviex-search-field',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField implements OnInit {
  http = inject(TmdbApiService);
  store = inject(Store);
  isFocusOnInput = signal(false);
  searchControl = new FormControl('');
  searchPostersResults = computed(() => this.store.searchPostersResults());
  searchPeopleResults = computed(() => this.store.searchPeopleResults());
  id = input();

  ngOnInit() {
    this.store.saveSearchPostersResults([]);
    this.store.saveSearchPeopleResults([]);

    if (this.id() === 'multi') {
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((query) => {
            if (query && query.length > 0) {
              return this.http.searchMulti({ query });
            }
            return of({ results: [] });
          }),
        )
        .subscribe({
          next: (response) => {
            this.store.saveSearchPeopleResults([]);
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
              this.store.saveSearchPeopleResults([]);
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
              this.store.saveSearchPeopleResults(result);
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
}
