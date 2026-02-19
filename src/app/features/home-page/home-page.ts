import { Component, inject, OnInit } from '@angular/core';
import { PreviewSlider } from './components/preview-slider/preview-slider';
import { SearchField } from '../../shared/components/search-field/search-field';
import { Store } from '../../core/store/store';

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [PreviewSlider, SearchField],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  store = inject(Store);

  previewCatalogs = this.store.catalogs;

  ngOnInit() {
    this.store.loadAllCatalogs();
  }
}
