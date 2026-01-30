import { Component } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'moviex-header',
  standalone: true,
  imports: [MatAnchor, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
