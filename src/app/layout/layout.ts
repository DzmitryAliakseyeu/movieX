import { Component, inject, OnInit } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';
import { Store } from '../core/store/store';
import { Modal } from '../shared/modal/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'moviex-layout',
  standalone: true,
  imports: [Header, Footer, RouterOutlet, Modal, DatePipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.setTheme('dark');
  }
}
