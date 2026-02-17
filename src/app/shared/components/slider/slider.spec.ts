import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slider } from './slider';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';

describe('Slider', () => {
  let component: Slider;
  let fixture: ComponentFixture<Slider>;
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
    theme: signal('dark'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(Slider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
