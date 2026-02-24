import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { provideRouter } from '@angular/router';
import { Store } from '../../core/store/store';
import { By } from '@angular/platform-browser';

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
    loadAllCatalogs: vi.fn,
    saveSearchPostersResults: vi.fn,
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

  it('should be called spinner when loading', () => {
    component.isLoading.set(true);
    fixture.detectChanges()
    const spinner = fixture.debugElement.query(By.css('.loader-container'))
    expect(spinner).toBeTruthy();
      const contentSection = fixture.debugElement.query(By.css('.content-section'))
    expect(contentSection).toBeNull();
  })


    it('should be render content section', () => {
    component.isLoading.set(false);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.loader-container'))
    expect(spinner).toBeNull();
    const contentSection = fixture.debugElement.query(By.css('.content-section'))
    expect(contentSection).toBeTruthy();
  })
});
