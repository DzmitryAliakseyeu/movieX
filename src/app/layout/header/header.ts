import { Component, computed, inject } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { Store } from '../../core/store/store';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme/theme-service';

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton, MatIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(Store);
  themeService = inject(ThemeService);
  themeModeText = computed(() => this.themeService.theme());
}
