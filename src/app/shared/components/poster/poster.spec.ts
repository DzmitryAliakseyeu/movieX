import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Poster } from './poster';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';

describe('Poster', () => {
  let component: Poster;
  let fixture: ComponentFixture<Poster>;
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
    tmdbApiConfiguration: signal<Partial<Configuration> | undefined>(mockConfig),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Poster,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Poster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
