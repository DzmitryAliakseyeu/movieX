import { Component, computed, inject } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { Store } from '../../core/store/store';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton, MatIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(Store);
  themeMode = computed(() => this.store.theme());
  themeModeText = computed(() => `${this.themeMode()}_mode`);

  toggleTheme() {
    this.store.toggleTheme();
  }
}
