import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
  input,
  viewChildren,
  AfterViewChecked,
} from '@angular/core';
import { Poster } from '../../../features/home-page/components/poster/poster';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TmdbApi } from '../../../core/services/tmdb-api';
import { PosterI, Store } from '../../../core/store/store';

@Component({
  selector: 'moviex-slider',
  standalone: true,
  imports: [Poster, MatIconModule, MatButtonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider implements AfterViewChecked {
  http = inject(TmdbApi);
  store = inject(Store);

  catalogContent = input<PosterI[]>();

  index = 0;
  transform = 'translateX(0px)';

  catalogSlider = viewChild<ElementRef>('catalogSlider');
  postersList = viewChildren('posterRef', { read: ElementRef });
  elCatalogSlider = computed(() => this.catalogSlider()?.nativeElement);

  quantitySliderSections = signal(0);

  ngAfterViewChecked() {
    const el = this.elCatalogSlider();
    if (!el) return;

    const width = el.clientWidth;
    const posters = this.postersList();
    const firstPoster = posters[0]?.nativeElement as HTMLElement;
    const posterWidth = firstPoster?.clientWidth;
    const content = this.catalogContent();
    if (content) {
      this.quantitySliderSections.set(Math.floor(content.length / (width / (posterWidth + 10))));
    }
  }

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
    const avaliableClicks = computed(() => this.quantitySliderSections());
    if (this.index < avaliableClicks()) {
      this.index++;
      this.update();
    }
  }
}
