import { Component, inject } from '@angular/core';
import { People } from './people/people';
import { SearchField } from '../../shared/components/search-field/search-field';
import { PeopleService } from '../../core/services/people-service/people-service';

@Component({
  selector: 'moviex-people-page',
  standalone: true,
  imports: [People, SearchField],
  templateUrl: './people-page.html',
  styleUrl: './people-page.scss',
})
export class PeoplePage {
  peopleService = inject(PeopleService);

  constructor() {
    this.peopleService.loadPeople();
  }
}
