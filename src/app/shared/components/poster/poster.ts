import { Component, inject, input, signal } from '@angular/core';
import { PersonI, PosterI, Store } from '../../../core/store/store';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TmdbApi } from '../../../core/services/tmdb-api';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'moviex-poster',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
})
export class Poster {
  private http = inject(TmdbApi);
  private store = inject(Store);
  public data = input<PosterI | PersonI>();

  clickedId = signal<number | null>(null);
  personDetails = toSignal(
    toObservable(this.clickedId).pipe(
      filter((id) => id !== null),
      switchMap((id) => this.http.getPersonDetails(id!)),
    ),
  );

  isPerson(item: PersonI | PosterI): item is PersonI {
    return 'profile_path' in item;
  }

  showInfo(id: number) {
    this.store.savePersonDetail(id);
  }
}
