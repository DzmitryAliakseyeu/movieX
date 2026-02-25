import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Poster } from './poster';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../../core/store/store';
import { PosterI } from '../../../core/services/poster-service/poster-service.model';
import { PersonI } from '../../../core/services/people-service/people.model';
import { PeopleService } from '../../../core/services/people-service/people-service';

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

  const mockPeopleService: Partial<PeopleService> = {
    savePersonDetail: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poster],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Store, useValue: mockStore },
        { provide: PeopleService, useValue: mockPeopleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Poster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject PeopleService', () => {
    expect(component.peopleService).toBeTruthy();
  });

  it('should identify isPerson for rendering person poster', () => {
    const personPoster: PersonI = {
      id: 1,
      name: 'John Doe',
      profile_path: '/path/to/poster.jpg',
    };

    const result = component.isPerson(personPoster);
    expect(result).toBe(true);
  });

  it('should identify isPerson as false for movie/tv poster', () => {
    const moviePoster: PosterI = {
      id: 1,
      title: 'Test Movie',
      date: '2023-01-01',
      imageUrl: '/path/to/poster.jpg',
    };

    const result = component.isPerson(moviePoster);
    expect(result).toBe(false);
  });

  it('should call savePersonDetail when showInfo is called', () => {
    const id = 123;

    component.showInfo(id);

    expect(mockPeopleService.savePersonDetail).toHaveBeenCalledWith(id);
  });
});
