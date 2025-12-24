
export interface SearchResult {
  _id: string;
  title: string;
  description?: string;
  link: string;
  type: string;
  tags: { _id: string; title: string }[]
  owner: string;
  createdAt: string;
  updatedAt: string;
  score: number;
}
