import { Component, input } from '@angular/core';
import { CatalogButton } from './catalog-button/catalog-button';

@Component({
  selector: 'moviex-catalog',
  standalone: true,
  imports: [CatalogButton],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  catalogTitle = input('catalog title');
}
