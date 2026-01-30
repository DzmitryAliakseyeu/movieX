import { Component } from '@angular/core';
import { Catalog } from './components/catalog/catalog'
import { SearchField } from "../../shared/components/search-field/search-field";

@Component({
  selector: 'moviex-home-page',
  standalone: true,
  imports: [Catalog, SearchField],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
