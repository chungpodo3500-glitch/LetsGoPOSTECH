export interface Issue {
  number: number;
  year: number;
  season: string; // e.g. "봄호", "여름호", "가을호", "겨울호"
  title: string;
  publishDate: string;
  pdfFile: string;
  pageCount: number;
  editorialTheme: string;
  featuredArticle: string;
  articleCount: number;
}
export type MagazineIssue = Issue;

export interface Article {
  id: string;
  issueNumber: number;
  year: number;
  section: string;
  category?: "feature" | "interview" | "lab" | "science" | "career" | "campus" | "essay" | "other";
  headline: string;
  author?: string;
  authorNote?: string;
  professors?: string[];
  labs?: string[];
  department?: string;
  summary: string[];
  keyConcepts: string[];
  images?: { src: string; caption: string; alt?: string }[];
  featured?: boolean;
}
export type MagazineArticle = Article;

export interface PuzzleClue {
  number: string;
  direction: "가로" | "세로";
  clue: string;
  answer: string;
  hint?: string;
}

export interface IssuePuzzle {
  issueNumber: number;
  year: number;
  season: string;
  deadline?: string;
  title?: string;
  puzzleImage?: string;
  gridImage?: string;
  horizontalClues: PuzzleClue[];
  verticalClues: PuzzleClue[];
  hiddenAnswer?: string;
  hiddenAnswerQuestion?: string;
  tips?: string[];
  note?: string;
}
