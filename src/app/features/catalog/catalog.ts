import { Component, input } from '@angular/core';
import { CatalogButton } from './catalog-button/catalog-button';
import { Poster } from './poster/poster';

@Component({
  selector: 'moviex-catalog',
  standalone: true,
  imports: [CatalogButton, Poster],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  catalogTitle = input('catalog title');
}
