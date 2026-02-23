import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePage } from './people-page';
import { provideRouter } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../core/store/store';

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
    saveSearchPostersResults: vi.fn,
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
});
