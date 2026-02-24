import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logos container', () => {
    const logosContainer = fixture.debugElement.query(By.css('.logos-container'))
      .nativeElement as HTMLElement;
    expect(logosContainer).toBeTruthy();
  });

  it('should have RSS feed link with correct href', () => {
    const rssLink = fixture.debugElement.query(By.css('a.rss-logo')).nativeElement as HTMLElement;
    expect(rssLink).toBeTruthy();
    expect(rssLink?.getAttribute('href')).toBe('https://rs.school/courses/angular');
    expect(rssLink?.getAttribute('target')).toBe('_blank');
    expect(rssLink?.getAttribute('rel')).toBe('noopener');
  });

  it('should have RSS logo image', () => {
    const rssImage = fixture.debugElement.query(By.css('a.rss-logo img'))
      .nativeElement as HTMLElement;
    expect(rssImage).toBeTruthy();
    expect(rssImage?.getAttribute('alt')).toBe('RSS logo');
  });

  it('should have TMDB link with correct href', () => {
    const tmdbLink = fixture.debugElement.query(By.css('a[href*="https://www.themoviedb.org/"]'))
      .nativeElement as HTMLElement;
    expect(tmdbLink).toBeTruthy();
    expect(tmdbLink?.getAttribute('href')).toContain('https://www.themoviedb.org/');
    expect(tmdbLink?.getAttribute('target')).toBe('_blank');
    expect(tmdbLink?.getAttribute('rel')).toBe('noopener');
  });

  it('should have TMDB logo image', () => {
    const tmdbImage = fixture.debugElement.query(By.css('a[href*="themoviedb"] img'))
      .nativeElement as HTMLElement;
    expect(tmdbImage).toBeTruthy();
    expect(tmdbImage?.getAttribute('alt')).toBe('TMDB logo');
  });

  it('should have About link', () => {
    const aboutLink = fixture.debugElement.query(By.css('a[href="/about"]'))
      .nativeElement as HTMLElement;
    expect(aboutLink).toBeTruthy();
    expect(aboutLink?.textContent).toContain('About');
    expect(aboutLink?.getAttribute('target')).toBe('_blank');
    expect(aboutLink?.getAttribute('rel')).toBe('noopener');
  });

  it('should render all footer links', () => {
    const allLinks = fixture.debugElement.queryAll(By.css('a'));
    expect(allLinks.length).toBeGreaterThanOrEqual(3);
  });
});
