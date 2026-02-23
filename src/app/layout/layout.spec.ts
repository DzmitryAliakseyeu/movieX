import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../core/store/store';
import { Configuration } from 'tmdb-ts';

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
    tmdbApiConfiguration: vi.fn().mockReturnValue(mockConfig),
    theme: vi.fn(),
    setTheme: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Layout,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Store, useValue: mockStore },
        { provide: mockStore.tmdbApiConfiguration, useValue: mockConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
