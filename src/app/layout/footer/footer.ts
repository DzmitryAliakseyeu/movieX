import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'moviex-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
