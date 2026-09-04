import type { Book } from "../../../data";

export interface BookSectionProps {
  title: string;
  subtitle?: string;
  books: Book[];
}