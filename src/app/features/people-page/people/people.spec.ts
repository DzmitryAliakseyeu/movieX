import { ComponentFixture, TestBed } from '@angular/core/testing';
import { People } from './people';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';
import { PageEvent } from '@angular/material/paginator';

describe('People', () => {
  let component: People;
  let fixture: ComponentFixture<People>;
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [People],
      providers: [provideRouter([]), { provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(People);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate with correct query params when changePageIndex is called', () => {
    const router = TestBed.inject(Router);
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const navigateSpy = vi.spyOn(router, 'navigate');

    const mockPageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 10,
      length: 100,
    };

    component.changePageIndex(mockPageEvent);

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: activatedRoute,
      queryParams: {
        page: 3,
      },
      queryParamsHandling: 'merge',
    });
  });
});
