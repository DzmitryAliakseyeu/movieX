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

  it('should have default theme as light', () => {
    expect(service.theme()).toBe('light');
  });

  it('should update theme correctly', () => {
    service.updateTheme();
    expect(service.theme()).toBe('dark');
    service.updateTheme();
    expect(service.theme()).toBe('light');
  });
});
