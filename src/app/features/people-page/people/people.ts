import { Component, inject, signal } from '@angular/core';
import { Poster } from '../../../shared/components/poster/poster';
import { PeopleService } from '../../../core/services/people-service/people-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'moviex-people',
  standalone: true,
  imports: [Poster, MatPaginator, MatProgressSpinner],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  protected peopleService = inject(PeopleService);
  protected people = this.peopleService.people;
  protected page = signal<number | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  changePageIndex = (event: PageEvent) => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: event.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  };
}
