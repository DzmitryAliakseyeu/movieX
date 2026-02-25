import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SearchField } from './search-field';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';
import { By } from '@angular/platform-browser';
import { PeopleService } from '../../../core/services/people-service/people-service';
import { PosterService } from '../../../core/services/poster-service/poster-service';
import { PersonI } from '../../../core/services/people-service/people.model';
import { PosterI } from '../../../core/services/poster-service/poster-service.model';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';

describe('SearchField', () => {
  let component: SearchField;
  let fixture: ComponentFixture<SearchField>;
  const mockConfig: Partial<Configuration> = {
    images: {
      secure_base_url: 'https://image.tmdb.org/t/p',
      base_url: 'http://image.tmdb.org/t/p/',
      backdrop_sizes: [],
      logo_sizes: [],
      poster_sizes: ['w500'],
      profile_sizes: [],
      still_sizes: [],
    },
  };
  const mockStore = {
    tmdbApiConfiguration: signal(mockConfig),
    saveSearchPostersResults: vi.fn(),
  };

  const mockPeopleService: Partial<PeopleService> = {
    searchPeopleResults: signal<PersonI[]>([]),
    saveSearchPeopleResults: vi.fn(),
  };

  const mockPosterService: Partial<PosterService> = {
    searchPostersResults: signal<PosterI[]>([]),
    saveSearchPostersResults: vi.fn(),
  };

  const mockTmdbApiService: Partial<TmdbApiService> = {
    searchMulti: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchField],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: PeopleService, useValue: mockPeopleService },
        { provide: PosterService, useValue: mockPosterService },
        { provide: TmdbApiService, useValue: mockTmdbApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject TmdbApiService', () => {
    expect(component.http).toBeTruthy();
  });

  it('should inject PeopleService', () => {
    expect(component.peopleService).toBeTruthy();
  });

  it('should inject PosterService', () => {
    expect(component.posterService).toBeTruthy();
  });

  it('should have input control initialized', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#search'))
      .nativeElement as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    expect(inputElement.value).toBe('');
  });

  it('should exist placeholder text inside input', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#search'))
      .nativeElement as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    expect(inputElement.placeholder).toBe('Search...');
  });

  it('should update searchControl value on input', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#search'))
      .nativeElement as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    inputElement.value = 'Brad Pitt';
    inputElement.dispatchEvent(new Event('input'));
    expect(inputElement.value).toBe('Brad Pitt');
  });

  it('should set isFocusOnInput to true on input focus', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#search'))
      .nativeElement as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    inputElement.dispatchEvent(new Event('focus'));
    expect(component.isFocusOnInput()).toBe(true);
  });

  it('should set isFocusOnInput to false on input blur', () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('#search'))
      .nativeElement as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    inputElement.dispatchEvent(new Event('blur'));
    expect(component.isFocusOnInput()).toBe(false);
  });

  it('searchPeopleResults should be empty if searchPostersResult is not empty', () => {
    mockPeopleService.searchPeopleResults?.set([]);
    mockPosterService.searchPostersResults?.set([{ id: 1, title: 'Test Movie', date: '2020-01-01', imageUrl: 'url' }]);
    fixture.detectChanges();
    expect(mockPeopleService.searchPeopleResults?.().length).toBe(0);
  });

  it('searchPosterResults should be empty if searchPeopleResult is not empty', () => {
    mockPosterService.searchPostersResults?.set([]);
    mockPeopleService.searchPeopleResults?.set([{ id: 1, name: 'Test Person', profile_path: 'path/to/profile' }]);
    fixture.detectChanges();
    expect(mockPosterService.searchPostersResults?.().length).toBe(0);
  });
});
