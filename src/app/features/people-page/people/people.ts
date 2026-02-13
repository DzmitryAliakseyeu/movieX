import { Component, computed, inject } from '@angular/core';

import { Store } from '../../../core/store/store';
import { Poster } from '../../../shared/components/poster/poster';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';

@Component({
  selector: 'moviex-people',
  imports: [Poster],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  http = inject(TmdbApiService);
  store = inject(Store);
  people = computed(() => this.store.people());
}
