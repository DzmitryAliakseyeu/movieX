import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { provideRouter } from '@angular/router';
import { Store } from '../../core/store/store';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const mockStore = {
    searchResults: [],
    catalogs: () => [
      {
        id: 'movies',
        title: 'Movies',
        content: [],
      },
      {
        id: 'upcomming-movies',
        title: 'Upcomming Movies',
        content: [],
      },
      {
        id: 'tv-shows',
        title: 'TV Shows',
        content: [],
      },
    ],
    loadAllCatalogs: () => {
      //
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HomePage, provideRouter([]), { provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
