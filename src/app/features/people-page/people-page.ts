import { Component, inject, signal } from '@angular/core';
import { People } from "./people/people";
import { Store } from '../../core/store/store';

@Component({
  selector: 'moviex-people-page',
  standalone: true,
  imports: [People],
  templateUrl: './people-page.html',
  styleUrl: './people-page.scss',
})
export class PeoplePage {
  store = inject(Store);
  isLoaded = signal(false)


   ngOnInit() {
    this.store.loadPeople();
  }

}
