import { CanActivateFn, RedirectCommand } from '@angular/router';
import { MediaType } from '../../shared/models/common.models';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const catalogGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const mediaType = route.paramMap.get('mediaType');
  const isValid = mediaType === MediaType.Movie || mediaType === MediaType.TVShow;

  if (isValid) {
    return true;
  }

  return new RedirectCommand(router.createUrlTree(['/404']), { replaceUrl: true });
};
