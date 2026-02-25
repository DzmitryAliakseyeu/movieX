import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Slider } from './slider';
import { Configuration } from 'tmdb-ts';
import { Signal, signal } from '@angular/core';
import { Store } from '../../../core/store/store';
import { By } from '@angular/platform-browser';
import { PosterI } from '../../../core/services/poster-service/poster-service.model';
import { ActivatedRoute } from '@angular/router';

describe('Slider', () => {
  let component: Slider;
  let fixture: ComponentFixture<Slider>;
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
    theme: signal('dark'),
  };

  const mockPosters: PosterI[] = [
    { id: 1, title: 'Movie 1', date: '2023-01-01', imageUrl: '/path1.jpg' },
    { id: 2, title: 'Movie 2', date: '2023-02-01', imageUrl: '/path2.jpg' },
    { id: 3, title: 'Movie 3', date: '2023-03-01', imageUrl: '/path3.jpg' },
    { id: 4, title: 'Movie 4', date: '2023-04-01', imageUrl: '/path4.jpg' },
    { id: 5, title: 'Movie 5', date: '2023-05-01', imageUrl: '/path5.jpg' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Slider);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('previewSliderContent', mockPosters);
    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have initial transform set to translateX(0px)', () => {
    fixture.detectChanges();
    expect(component['transform']()).toBe('translateX(0px)');
  });

  it('should have initial index set to 0', () => {
    fixture.detectChanges();
    expect(component['index']()).toBe(0);
  });

  it('should render slider container', () => {
    fixture.detectChanges();
    const sliderElement = fixture.debugElement.query(By.css('.preview-catalog-slider'));
    expect(sliderElement).toBeTruthy();
  });

  it('should render track element', () => {
    fixture.detectChanges();
    const trackElement = fixture.debugElement.query(By.css('.track'));
    expect(trackElement).toBeTruthy();
  });

  it('should render slider buttons container', () => {
    fixture.detectChanges();
    const buttonsContainer = fixture.debugElement.query(By.css('.slider-buttons'));
    expect(buttonsContainer).toBeTruthy();
  });

  it('should render prev and next buttons', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should have prev button with chevron_left icon', () => {
    fixture.detectChanges();
    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0];
    const icon = prevButton.query(By.css('mat-icon'));
    expect(icon.nativeElement.textContent.trim()).toBe('chevron_left');
  });

  it('should have next button with chevron_right icon', () => {
    fixture.detectChanges();
    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1];
    const icon = nextButton.query(By.css('mat-icon'));
    expect(icon.nativeElement.textContent.trim()).toBe('chevron_right');
  });

  it('should disable prev button when canShowPrev is false', () => {
    fixture.detectChanges();
    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('should call showNext when next button is clicked', () => {
    fixture.detectChanges();
    const showNextSpy = vi.spyOn(component, 'showNext');
    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement as HTMLButtonElement;
    
    nextButton.click();
    
    expect(showNextSpy).toHaveBeenCalled();
  });

  it('should call showPrev when prev button is clicked', () => {

    const showPrevSpy = vi.spyOn(component, 'showPrev');
    component['index'].set(1);
    fixture.detectChanges();
    
    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement as HTMLButtonElement;
    prevButton.click();
    
    expect(showPrevSpy).toHaveBeenCalled();
  });

  it('should update index when showNext is called', () => {

    component['quantitySliderSections'].set(2);
        fixture.detectChanges();
    const initialIndex = component['index']();

    component.showNext();
    
    expect(component['index']()).toBe(initialIndex + 1);
  });

  it('should update index when showPrev is called', () => {

    component['index'].set(2);
       fixture.detectChanges();
    const initialIndex = component['index']();
 
    component.showPrev();
    
    expect(component['index']()).toBe(initialIndex - 1);
  });

  it('should not update index in showNext when canShowNext is false', () => {
    component['quantitySliderSections'].set(0);
    component['index'].set(1);
        fixture.detectChanges();
    const initialIndex = component['index']();

    component.showNext();
    
    expect(component['index']()).toBe(initialIndex);
  });

  it('should not update index in showPrev when canShowPrev is false', () => {
    component['index'].set(0);
    fixture.detectChanges();
    component.showPrev();
    
    expect(component['index']()).toBe(0);
  });

  it('should compute canShowPrev correctly when index is 0', () => {
    component['index'].set(0);
    fixture.detectChanges();
    expect(component['canShowPrev']()).toBe(false);
  });

  it('should compute canShowPrev correctly when index is greater than 0', () => {
    component['index'].set(1);
    fixture.detectChanges();
    expect(component['canShowPrev']()).toBe(true);
  });
});
