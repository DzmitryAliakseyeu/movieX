import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'moviex-search-field',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
})
export class SearchField {}
