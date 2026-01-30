import { Component, input } from '@angular/core';
import { CatalogButton } from './components/catalog-button/catalog-button';
import { Slider } from './components/slider/slider';

@Component({
  selector: 'moviex-catalog',
  standalone: true,
  imports: [CatalogButton, Slider],
  templateUrl: './catalog.html',

  styleUrl: './catalog.scss',
})
export class Catalog {
  catalogTitle = input('catalog title');
}
