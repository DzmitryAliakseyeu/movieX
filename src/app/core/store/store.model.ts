import { Configuration } from 'tmdb-ts';
import { PersonI } from '../services/people-service/people.model';

export interface PosterI {
  id: number;
  title: string;
  date: string;
  imageUrl?: string;
}

export interface PreviewSliderI {
  id: string;
  title: string;
  content: PosterI[];
}

export interface State {
  catalogs: PreviewSliderI[];
  searchResults: PosterI[] | [];
  searchPostersResults: PosterI[] | [];
  tmdbApiConfiguration: Configuration | undefined;
}
