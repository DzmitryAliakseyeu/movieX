import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'tmdb-ts';
import { By } from '@angular/platform-browser';

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

  it('should inject Store', () => {
    expect(component.store).toBeTruthy();
  });

  it('should inject ThemeService', () => {
    expect(component.themeService).toBeTruthy();
  });

  it('should have correct logo URL', () => {
    fixture.detectChanges();
    const logoElement = fixture.debugElement.query(By.css('.logo img'))
      .nativeElement as HTMLImageElement;
    expect(logoElement.src).toContain('logo-mobile.svg');
  });

  it('should have correct alt text for logo', () => {
    fixture.detectChanges();
    const logoElement = fixture.debugElement.query(By.css('.logo img'))
      .nativeElement as HTMLImageElement;
    expect(logoElement.alt).toBe('Logo');
  });

  it('should have theme toggle button', () => {
    fixture.detectChanges();
    const toggleButton = fixture.debugElement.query(By.css('.management button'))
      .nativeElement as HTMLElement;
    expect(toggleButton).toBeTruthy();
  });

  it('should call toggleTheme on button click', () => {
    fixture.detectChanges();
    const toggleButton = fixture.debugElement.query(By.css('.management button'))
      .nativeElement as HTMLElement;
    expect(toggleButton).toBeTruthy();
    const spy = vi.spyOn(component.themeService, 'updateTheme');
    toggleButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
