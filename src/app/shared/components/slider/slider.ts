import {
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
  input,
  viewChildren,
  AfterViewChecked,
} from '@angular/core';
import { Poster } from '../poster/poster';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PosterI } from '../../../core/store/store.model';

@Component({
  selector: 'moviex-slider',
  standalone: true,
  imports: [Poster, MatIconModule, MatButtonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider implements AfterViewChecked {
  public previewSliderContent = input<PosterI[]>();
  private index = signal(0);
  protected transform = signal('translateX(0px)');
  private catalogSlider = viewChild<ElementRef>('previewSlider');
  private postersList = viewChildren('posterRef', { read: ElementRef });
  protected elCatalogSlider = computed(() => this.catalogSlider()?.nativeElement);
  private quantitySliderSections = signal(0);

  ngAfterViewChecked() {
    const el = this.elCatalogSlider();
    if (!el) return;

    const width = el.clientWidth;
    const posters = this.postersList();
    const firstPoster = posters[0]?.nativeElement as HTMLElement;
    const posterWidth = firstPoster?.clientWidth;
    const content = this.previewSliderContent();
    if (content) {
      this.quantitySliderSections.set(Math.floor(content.length / (width / (posterWidth + 10))));
    }
  }

  protected canShowPrev = computed(() => this.index() > 0);
  protected canShowNext = computed(() => this.index() < this.quantitySliderSections());

  update() {
    const el = this.elCatalogSlider();
    if (!el) return;

    const width = el.clientWidth;
    this.transform.set(`translateX(-${this.index() * width}px)`);
  }

  showPrev() {
    if (this.canShowPrev()) {
      this.index.set(this.index() - 1);
      this.update();
    }
  }

  showNext() {
    if (this.canShowNext()) {
      this.index.set(this.index() + 1);
      this.update();
    }
  }
}
