export interface CatalogForm {
  keywords?: string;
  year?: string;
  genre?: { id: number; name: string } | null;
  page?: number;
}
