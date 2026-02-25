import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Layout } from './layout';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../core/store/store';
import { Configuration } from 'tmdb-ts';
import { PeopleService } from '../core/services/people-service/people-service';
import { PersonI } from '../core/services/people-service/people.model';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
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
    theme: vi.fn(),
    setTheme: vi.fn(),
  };

  const mockPeopleService: Partial<PeopleService> = {
    activePerson: signal<PersonI | null>(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Store, useValue: mockStore },
        { provide: PeopleService, useValue: mockPeopleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject PeopleService', () => {
    expect(component.peopleService).toBeTruthy();
  });

  it('should be active person', () => {
    const mockPerson: PersonI = {
      id: 1,
      name: 'John Doe',
      profile_path: 'path/to/profile',
      bio: 'Bio',
      dateOfBirth: '2000-01-01',
      dateOfDead: '2020-01-01',
    };

    mockPeopleService.activePerson?.set(mockPerson);
    fixture.detectChanges();
    expect(mockPeopleService.activePerson?.()).toBeTruthy();
  });

  it('should have activePerson value null', () => {
    mockPeopleService.activePerson?.set(null);
    fixture.detectChanges();
    expect(mockPeopleService.activePerson?.()).toBeNull();
  });

  it('should render modal if isActivePerson', () => {
    const mockPerson: PersonI = {
      id: 1,
      name: 'John Doe',
      profile_path: 'path/to/profile',
      bio: 'Bio',
      dateOfBirth: '2000-01-01',
      dateOfDead: '2020-01-01',
    };

    mockPeopleService.activePerson?.set(mockPerson);
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('moviex-modal'));
    expect(modalElement).toBeTruthy();
  });

  it('should not render modal if activePerson is null', () => {
    const mockPerson = null;

    mockPeopleService.activePerson?.set(mockPerson);
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('moviex-modal'));
    expect(modalElement).toBeNull();
  });
});
