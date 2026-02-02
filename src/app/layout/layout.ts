import { Component, inject, OnInit } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { Store } from '../core/store/store';

@Component({
  selector: 'moviex-layout',
  standalone: true,
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.setTheme('dark');
  }
}
