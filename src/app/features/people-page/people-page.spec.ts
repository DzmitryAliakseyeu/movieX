import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { PeoplePage } from './people-page';
import { provideRouter } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../core/store/store';
import { By } from '@angular/platform-browser';

describe('PeoplePage', () => {
  let component: PeoplePage;
  let fixture: ComponentFixture<PeoplePage>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeoplePage],
      providers: [provideRouter([]), { provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PeoplePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    expect(titleElement.textContent).toContain('Popular people');
  });

  it('should be rendered search field', () => {
    fixture.detectChanges();
    const searchField = fixture.debugElement.query(By.css('moviex-search-field'));
    expect(searchField).toBeTruthy();
  });

  it('should have PeopleService injected', () => {
    expect(component.peopleService).toBeTruthy();
  });

  it('should have Router injected', () => {
    expect(component.router).toBeTruthy();
  });

  it('should have ActivatedRoute injected', () => {
    expect(component.activatedRoute).toBeTruthy();
  });

  it('should render people component', () => {
    fixture.detectChanges();
    const peopleComponent = fixture.debugElement.query(By.css('moviex-people'));
    expect(peopleComponent).toBeTruthy();
  });
});
