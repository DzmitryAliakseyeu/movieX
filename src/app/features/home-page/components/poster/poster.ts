import { Component, input } from '@angular/core';
import { PosterI } from '../../../../core/store/store';

@Component({
  selector: 'moviex-poster',
  standalone: true,
  imports: [],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
})
export class Poster {
  poster = input<PosterI>()

}
