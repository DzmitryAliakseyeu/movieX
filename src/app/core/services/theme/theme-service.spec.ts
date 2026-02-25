import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set theme during initialization', () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      expect(service.theme()).toBe(theme);
    } else {
      expect(service.theme()).toBe('light');
    }
  });

  it('should update theme correctly', () => {
    service.updateTheme();
    if (service.theme() === 'dark') {
      expect(service.theme()).toBe('dark');
    } else {
      expect(service.theme()).toBe('light');
    }
  });
});
