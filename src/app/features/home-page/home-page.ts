import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { PreviewSlider } from './components/preview-slider/preview-slider';
import { SearchField } from '../../shared/components/search-field/search-field';
import { Store } from '../../core/store/store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [PreviewSlider, SearchField, MatProgressSpinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  store = inject(Store);

  previewCatalogs = this.store.catalogs;
  isLoading = signal(false);

  constructor() {
     effect(() => {
      const catalogs = this.store.catalogs();
      if (catalogs.every((c) => c.content.length > 0)) {
        this.isLoading.set(false);
      }
    });
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.store.loadAllCatalogs();

  }
}
