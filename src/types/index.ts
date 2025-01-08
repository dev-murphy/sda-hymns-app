export interface HymnData {
  hymn_number: number;
  title: string;
  category: string;
  stanzas: string;
  subcategory?: string;
  first_line?: string;
  published_at?: string;
  key?: string;
  filename?: string;
  composer?: string;
  author?: string;
}
