export interface ArticleEditor {
  name: string;
  role: string;
  avatarKey?: string;
}

export interface ArticleInteractions {
  likes: number;
  shares: number;
  bookmarks: number;
}

export interface ArticleKpi {
  type: 'kpi';
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface ArticleProductCta {
  type: 'product';
  id: string;
  title: string;
  price: string;
  ctaLabel: string;
  url: string;
  badge?: string;
}

export interface ArticleJourneyCta {
  type: 'journey';
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  url: string;
}

export type ArticleCard = ArticleKpi | ArticleProductCta | ArticleJourneyCta;

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  editor: ArticleEditor;
  paragraphs: string[];
  interactions: ArticleInteractions;
  cards: ArticleCard[];
}
