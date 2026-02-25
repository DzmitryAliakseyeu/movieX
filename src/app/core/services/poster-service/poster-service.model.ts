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

export interface HomePageSliderI {
  catalogs: PreviewSliderI[];
  searchResults: PosterI[] | [];
  searchPostersResults: PosterI[] | [];
}
