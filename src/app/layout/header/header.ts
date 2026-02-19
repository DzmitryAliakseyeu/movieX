import { Component, computed, inject } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { NavItem } from './header.models';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { Store } from '../../core/store/store';
import { ThemeService } from '../../core/services/theme/theme-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton, RouterLink, MatToolbar, RouterLinkActive, MatIcon, MatIconButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected navItems: NavItem[] = [
    { id: 'movie', title: 'Movie', url: '/movies' },
    { id: 'tv', title: 'TV Shows', url: '/tv' },
    { id: 'people', title: 'People', url: '/people' },
  ];

  store = inject(Store);
  themeService = inject(ThemeService);
  themeModeText = computed(() => this.themeService.theme() + '_mode');
}
