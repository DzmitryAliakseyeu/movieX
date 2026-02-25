import { Component, input } from '@angular/core';
import { Slider } from '../../../../shared/components/slider/slider';
import { PreviewSliderI } from '../../../../core/services/poster-service/poster-service.model';

@Component({
  selector: 'moviex-preview-slider',
  standalone: true,
  imports: [Slider],
  templateUrl: './preview-slider.html',
  styleUrl: './preview-slider.scss',
})
export class PreviewSlider {
  previewSlider = input<PreviewSliderI>();
}
