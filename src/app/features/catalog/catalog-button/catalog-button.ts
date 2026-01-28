import { Component } from '@angular/core';

@Component({
  selector: 'moviex-catalog-button',
  standalone: true,
  imports: [],
  templateUrl: './catalog-button.html',
  styleUrl: './catalog-button.scss',
})
export class CatalogButton {
  getPosters() {
    const posters: [] = [];
    return posters
  }
}
