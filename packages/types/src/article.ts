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
  value: string;
  label: string;
  sublabel?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  editor: ArticleEditor;
  paragraphs: string[];
  interactions: ArticleInteractions;
  kpis: ArticleKpi[];
}
