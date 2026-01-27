import { Component } from '@angular/core';
import { Header } from './header/header';

@Component({
  selector: 'moviex-layout',
  standalone: true,
  imports: [Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
