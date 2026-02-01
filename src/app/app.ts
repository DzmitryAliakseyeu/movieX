import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'moviex-root',
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('movieX');
}
