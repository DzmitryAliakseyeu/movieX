import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchField } from './search-field';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';
import { TmdbApiService } from '../../../core/services/tmdb-api.service';
import { By } from '@angular/platform-browser';

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
    saveSearchPostersResults: vi.fn,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchField],
      providers: [{ provide: Store, useValue: mockStore }],
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
});
