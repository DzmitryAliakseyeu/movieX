import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';

@Component({
  selector: 'moviex-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('movieX');
}
