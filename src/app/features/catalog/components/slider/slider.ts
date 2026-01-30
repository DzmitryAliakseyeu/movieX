import { Component, computed, ElementRef, viewChild } from '@angular/core';
import { Poster } from '../poster/poster';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'moviex-slider',
  imports: [Poster, MatIconModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {
  index = 0;
  transform = 'translateX(0px)';

  catalogSlider = viewChild<ElementRef>('catalogSlider');
  elCatalogSlider = computed(() => this.catalogSlider()?.nativeElement);

  update() {
    const el = this.elCatalogSlider();
    if (!el) return;

    const width = el.clientWidth;
    this.transform = `translateX(-${this.index * width}px)`;
  }

  showPrev() {
    if (this.index > 0) {
      this.index--;
      this.update();
    }
  }

  showNext() {
    if (this.index < 3) {
      this.index++;
      this.update();
    }
  }
}
