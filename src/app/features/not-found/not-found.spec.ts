import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '404', component: NotFound }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Not Found message', () => {
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    expect(messageElement.textContent).toContain('Not Found');
  });

  it('should display This page doesn’t exist text', () => {
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('This page doesn’t exist');
  });

  it('should have a link to home page', () => {
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('href')).toBe('/');
  });

  it('should have a button to go back to home page', () => {
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.textContent).toContain('Go to home page');
  });

  it('should navigate to home page on button click', () => {
    fixture.detectChanges();
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
    linkElement.click();
    expect(window.location.pathname).toBe('/');
  });
});
