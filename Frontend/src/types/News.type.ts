export interface News {
  title: string;
  published: number;
  sponsor: string;
  symbols: string[];
  symbolsSVG: (string|undefined)[];
  content: string[];

  // Optional

  link?: string;
  secondary_link?: string;
}
