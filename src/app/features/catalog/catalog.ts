import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MediaType } from '../../shared/models/common.models';
import { MovieQueryOptions, TvShowQueryOptions } from 'tmdb-ts';
import { CatalogService } from './catalog-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFabButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog {
  protected mediaType = input<MediaType>();
  private formBuilder = inject(FormBuilder);
  private catalogService = inject(CatalogService);
  protected searchParams = signal<MovieQueryOptions | TvShowQueryOptions>({});
  protected catalogResource = this.catalogService.catalogResource;
  protected genres = this.catalogService.genres;
  protected pageIndex = signal(0);
  protected pageSize = 20;

  changePage = (event: PageEvent) => {
    this.pageIndex.set(event.pageIndex);
  };

  protected searchForm = this.formBuilder.nonNullable.group({
    keyword: [''],
    year: [''],
    genre: [''],
  });

  constructor() {
    effect(() => {
      this.catalogService.mediaType.set(this.mediaType());
    });

    effect(() => {
      this.catalogService.searchParams.set(this.searchParams());
    });
  }

  protected submitForm = (event: SubmitEvent) => {
    event.preventDefault();
    const { keyword, year, genre } = this.searchForm.getRawValue();

    this.searchParams.set({
      with_keywords: keyword,
      year: +year,
      with_genres: genre,
      page: this.pageIndex(),
    });
  };
}
// todo: keyword
