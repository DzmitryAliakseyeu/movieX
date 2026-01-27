import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'moviex-layout',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
