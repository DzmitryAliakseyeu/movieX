import { Component, computed, inject } from '@angular/core';
import { TmdbApi } from '../../../core/services/tmdb-api';
import { Store } from '../../../core/store/store';
import { Poster } from '../../../shared/components/poster/poster';

@Component({
  selector: 'moviex-people',
  imports: [Poster],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  http = inject(TmdbApi);
  store = inject(Store);
  people = computed(() => this.store.people());
}
