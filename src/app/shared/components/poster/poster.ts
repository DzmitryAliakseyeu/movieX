import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PosterI } from '../../../core/store/store.model';
import { PeopleService } from '../../../core/services/people-service/people-service';
import { PersonI } from '../../../core/services/people-service/people.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'moviex-poster',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
})
export class Poster {
  public posterData = input<PosterI | PersonI>();
  private peopleService = inject(PeopleService);

  isPerson(item: PersonI | PosterI): item is PersonI {
    return 'profile_path' in item;
  }

  showInfo(id: number) {
    this.peopleService.savePersonDetail(id);
  }
}
