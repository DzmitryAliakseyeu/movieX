import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MediaType } from '../../shared/models/common.models';
import { CatalogService } from './catalog-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFabButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Poster } from '../home-page/components/poster/poster';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogForm } from './catalog.models';
import { Genre } from 'tmdb-ts';

@Component({
  selector: 'moviex-catalog',
  imports: [
    MatProgressSpinner,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatFabButton,
    MatPaginator,
    Poster,
  ],
  providers: [CatalogService],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  protected catalogService = inject(CatalogService);
  protected mediaType = input<MediaType>();
  private formBuilder = inject(FormBuilder);
  protected pageSize = 20;
  protected page = signal<number | undefined>(undefined);

  protected searchForm = this.formBuilder.nonNullable.group<CatalogForm>({
    keywords: '',
    year: '',
    genre: undefined,
  });

  constructor() {
    effect(() => {
      const params = this.catalogService.queryParams();
      const genres = this.catalogService.genres();
      if (!params || !genres) {
        return;
      }

      const urlPage = +params['page'] || 1;
      this.page.set(urlPage - 1);

      const genreId = params['with_genres'];
      const selectedGenre = genres.find((genre) => `${genre.id}` === `${genreId}`);

      untracked(() => {
        this.searchForm.patchValue(
          {
            keywords: params['with_keywords'] ?? '',
            year: params['year'] ?? '',
            genre: selectedGenre ?? null,
          },
          { emitEvent: false },
        );
      });
    });
  }

  changePageIndex = (event: PageEvent) => {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: event.pageIndex + 1,
      },
      queryParamsHandling: 'merge',
    });
  };

  protected submitForm = (event: SubmitEvent) => {
    event.preventDefault();
    const { keywords, year, genre } = this.searchForm.getRawValue();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        with_keywords: keywords?.replaceAll(' ', ',') || null,
        year: year || null,
        with_genres: genre?.id || null,
        page: '1',
      },
      queryParamsHandling: 'merge',
    });
  };

  protected compareGenres(selected: Genre, option: Genre): boolean {
    return selected && option ? selected.id === option.id : selected === option;
  }
}
