import { Component, computed, effect, inject } from '@angular/core';
import { Person } from "./person/person";
import { TmdbApi } from '../../../core/services/tmdb-api';
import { PersonI, Store } from '../../../core/store/store';
import { getState } from '@ngrx/signals';


@Component({
  selector: 'moviex-people',
  imports: [Person],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  http = inject(TmdbApi);
  store = inject(Store);

  people = computed(() => this.store.people())

  constructor(){
    effect(()=> {
this.people = computed(() => this.store.people())
    })

  }





}
