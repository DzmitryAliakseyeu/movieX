import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { catalogGuard } from './catalog-guard';

describe('catalogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => catalogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
