import { inject, Injectable } from '@angular/core';
import { Store } from '../store/store';
import { PosterSize } from 'tmdb-ts/dist/types/configuration';

type PosterSizeValue = (typeof PosterSize)[keyof typeof PosterSize];

@Injectable({
  providedIn: 'root',
})
export class TmdbImageService {
  private store = inject(Store);

  buildImageUrl(params: { path: string; size: PosterSizeValue }): string {
    const { path, size } = params;
    const config = this.store.tmdbApiConfiguration();

    if (!config) {
      return '';
    }

    const baseUrl = config.images.secure_base_url;
    return `${baseUrl}/${size}/${path}`;
  }
}
