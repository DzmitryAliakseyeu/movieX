import { Component, inject } from '@angular/core';
import { People } from './people/people';
import { SearchField } from '../../shared/components/search-field/search-field';
import { PeopleService } from '../../core/services/people-service/people-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'moviex-people-page',
  standalone: true,
  imports: [People, SearchField],
  templateUrl: './people-page.html',
  styleUrl: './people-page.scss',
})
export class PeoplePage {
  peopleService = inject(PeopleService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const page = params['page'] ? +params['page'] : 1;
      this.peopleService.loadPeople(page);
    });
  }
}
