import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';
import { PersonI, PosterI } from '../../../core/store/store.model';
import { PeopleService } from '../../../core/services/people-service/people-service';

@Component({
  selector: 'moviex-poster',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
})
export class Poster {
  private http = inject(TmdbApiService);
  public posterData = input<PosterI | PersonI>();
  private peopleService = inject(PeopleService);

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
    this.peopleService.savePersonDetail(id);
  }
}
