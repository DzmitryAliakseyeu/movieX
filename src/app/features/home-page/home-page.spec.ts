import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading', async () => {
    component.isLoading.set(true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should hide spinner once catalogs populated', async () => {
    // simulate catalogs loaded
    component.store.catalogs.set([
      { id: 'movies', title: 'Movies', content: [{ id: 1, title: 'a', date: '', imageUrl: '' }] },
      { id: 'upcomming-movies', title: 'Upcomming Movies', content: [] },
      { id: 'tv-shows', title: 'TV Shows', content: [] },
    ]);
    // trigger effect
    component.isLoading.set(true);
    fixture.detectChanges();
    // effect should run synchronously
    expect(component.isLoading()).toBe(false);
  });
});
