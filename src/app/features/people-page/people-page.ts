import { Component, inject, signal, OnInit } from '@angular/core';
import { People } from './people/people';
import { Store } from '../../core/store/store';
import { SearchField } from "../../shared/components/search-field/search-field";

@Component({
  selector: 'moviex-people-page',
  standalone: true,
  imports: [People, SearchField],
  templateUrl: './people-page.html',
  styleUrl: './people-page.scss',
})
export class PeoplePage implements OnInit {
  store = inject(Store);
  isLoaded = signal(false);

  ngOnInit() {
    this.store.loadPeople();
  }
}
