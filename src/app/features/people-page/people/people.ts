import { Component, inject } from '@angular/core';
import { Store } from '../../../core/store/store';
import { Poster } from '../../../shared/components/poster/poster';
import { PeopleService } from '../../../core/services/people-service/people-service';

@Component({
  selector: 'moviex-people',
  standalone: true,
  imports: [Poster],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  peopleService = inject(PeopleService);
  people = this.peopleService.people;
}
