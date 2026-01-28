import { Component } from '@angular/core';
import { Catalog } from '../../features/catalog/catalog';

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [Catalog],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
