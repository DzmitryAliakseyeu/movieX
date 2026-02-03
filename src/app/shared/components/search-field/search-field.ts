import { Component, computed, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TmdbApi } from '../../../core/services/tmdb-api';
import { Store } from '../../../core/store/store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'moviex-search-field',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField {
  http = inject(TmdbApi);
  store = inject(Store);
  isFocusOnInput = signal(false)
  searchControl = new FormControl('');
  serachResults = computed(()=> this.store.searchResults())

  ngOnInit() {
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
          if(!response.results.length) {
               this.store.saveSearchResults([]);
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
            if(result.length){
              this.store.saveSearchResults(result);
            }

        },
      });
  }

  onFocus(){

    this.isFocusOnInput.set(true);
  }

  onBlur(){

    this.isFocusOnInput.set(false);
  }
}
