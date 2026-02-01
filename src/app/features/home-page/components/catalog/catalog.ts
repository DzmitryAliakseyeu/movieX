import { Component, input } from '@angular/core';
import { Slider } from '../../../../shared/components/slider/slider';

@Component({
  selector: 'moviex-catalog',
  standalone: true,
  imports: [Slider],
  templateUrl: './catalog.html',

  styleUrl: './catalog.scss',
})
export class Catalog {
  catalogTitle = input('catalog title');
}
