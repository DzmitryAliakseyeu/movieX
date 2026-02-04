import { Component, input } from '@angular/core';
import { PosterI } from '../../../../core/store/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'moviex-poster',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './poster.html',
  styleUrl: './poster.scss',
})
export class Poster {
  poster = input<PosterI>();
}
