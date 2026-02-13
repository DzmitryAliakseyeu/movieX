import { Component, input } from '@angular/core';
import { Slider } from '../../../../shared/components/slider/slider';
import { CatalogI } from '../../../../core/store/store';

@Component({
  selector: 'moviex-preview-slider',
  standalone: true,
  imports: [Slider],
  templateUrl: './preview-slider.html',

  styleUrl: './preview-slider.scss',
})
export class PreviewSlider {
  previewSlider = input<CatalogI>();
}
