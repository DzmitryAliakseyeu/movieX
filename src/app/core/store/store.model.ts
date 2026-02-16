import { Configuration } from 'tmdb-ts';

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
export interface PersonI {
  id: number;
  name: string;
  profile_path: string;
  bio?: string;
  dateOfBirth?: string;
  dateOfDead?: string;
}

export interface State {
  catalogs: PreviewSliderI[];
  searchResults: PosterI[] | [];
  searchPostersResults: PosterI[] | [];
  searchPeopleResults: PersonI[] | [];
  people: PersonI[];
  activePerson: PersonI | null;
  tmdbApiConfiguration: Configuration | undefined;
}
