import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catalogGuard } from './catalog-guard';
import { MediaType } from '../../shared/models/common.models';
import { vi } from 'vitest';

describe('catalogGuard', () => {
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => catalogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    router = TestBed.inject(Router);
  });

  const createMockRoute = (mediaType: string | undefined): ActivatedRouteSnapshot =>
    ({
      params: { mediaType },
      paramMap: { get: (key: string) => (key === 'mediaType' ? mediaType : null) },
    }) as unknown as ActivatedRouteSnapshot;

  const mockState = {} as RouterStateSnapshot;

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation for Movie media type', async () => {
    const route = createMockRoute(MediaType.Movie);
    const result = TestBed.runInInjectionContext(() => catalogGuard(route, mockState));

    expect(result).toBe(true);
  });

  it('should allow activation for TVShow media type', () => {
    const route = createMockRoute(MediaType.TVShow);
    const result = TestBed.runInInjectionContext(() => catalogGuard(route, mockState));

    expect(result).toBe(true);
  });

  it('should redirect to /404 for invalid media type', () => {
    const route = createMockRoute('invalid');
    const createUrlTreeSpy = vi.spyOn(router, 'createUrlTree');
    const result = TestBed.runInInjectionContext(() => catalogGuard(route, mockState));

    expect(result).toBeInstanceOf(RedirectCommand);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['/404']);
  });

  it('should redirect to /404 when mediaType is missing', () => {
    const route = createMockRoute(undefined);
    const createUrlTreeSpy = vi.spyOn(router, 'createUrlTree');
    const result = TestBed.runInInjectionContext(() => catalogGuard(route, mockState));

    expect(result).not.toBe(true);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['/404']);
  });
});
