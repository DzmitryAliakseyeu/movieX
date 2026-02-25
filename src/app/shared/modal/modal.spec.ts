import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';
import { Configuration } from 'tmdb-ts';
import { signal } from '@angular/core';
import { Store } from '../../core/store/store';
import { By } from '@angular/platform-browser';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;
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
    saveSearchPostersResults: vi.fn,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal on close button click', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(component, 'closeModal');
    const closeButton = fixture.debugElement.query(By.css('button')).nativeElement as HTMLElement;
    closeButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
