import type { Book } from "../../types/Book";

export interface FavoritesContextData {
    favorites: Book[];

    isFavorite: (bookId: number) => boolean;

    toggleFavorite: (book: Book) => void;

    removeFavorite: (bookId: number) => void;
}