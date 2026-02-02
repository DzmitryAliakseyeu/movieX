import { Component, inject } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { Store } from '../../core/store/store';

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(Store);

  toggleTheme() {
    this.store.toggleTheme();
  }
}
