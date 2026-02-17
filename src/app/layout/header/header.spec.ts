import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'tmdb-ts';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Header,
        { provide: ActivatedRoute, useValue: {} },
        // { provide: Store, useValue: mockStore },
        { provide: mockStore.tmdbApiConfiguration, useValue: mockConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
