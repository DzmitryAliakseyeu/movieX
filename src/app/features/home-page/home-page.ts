import { Component, effect, inject } from '@angular/core';
import { Catalog } from './components/catalog/catalog';
import { SearchField } from '../../shared/components/search-field/search-field';
import { Store } from '../../core/store/store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [Catalog, SearchField],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  store = inject(Store);

  catalogs = this.store.catalogs


  ngOnInit(){
    this.store.loadAllCatalogs();
  }
}
