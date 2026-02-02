import { Component, computed, ElementRef, inject, signal, viewChild, OnInit } from '@angular/core';
import { Poster } from '../../../features/home-page/components/poster/poster';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TmdbApi } from '../../../core/services/tmdb-api';

@Component({
  selector: 'moviex-slider',
  standalone: true,
  imports: [Poster, MatIconModule, MatButtonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider implements OnInit {
  http = inject(TmdbApi);
  dataApi = signal({});

  index = 0;
  transform = 'translateX(0px)';

  catalogSlider = viewChild<ElementRef>('catalogSlider');
  elCatalogSlider = computed(() => this.catalogSlider()?.nativeElement);

  ngOnInit() {
    this.http.getUpcomingMovieList().subscribe((data) => {
      this.dataApi.set(data);
    });
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
    if (this.index < 3) {
      this.index++;
      this.update();
    }
  }
}
