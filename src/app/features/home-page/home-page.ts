import { Component, inject, OnInit, signal } from '@angular/core';
import { PreviewSlider } from './components/preview-slider/preview-slider';
import { SearchField } from '../../shared/components/search-field/search-field';
import { Store } from '../../core/store/store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PosterService } from '../../core/services/poster-service/poster-service';

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [PreviewSlider, SearchField, MatProgressSpinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  store = inject(Store);
  posterService = inject(PosterService);

  previewCatalogs = this.posterService.catalogs;
  isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);
    this.posterService.loadAllCatalogs().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }
}
