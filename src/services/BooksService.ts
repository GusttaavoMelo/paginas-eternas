import { books } from "../data/books";
import type { Book } from "../types/Book";

class BooksService {
  getAll(): Book[] {
    return books;
  }

  getFeatured(): Book[] {
    return books.filter((book) => book.featured);
  }

  getBestSellers(): Book[] {
    return books.filter((book) => book.bestseller);
  }

  getNewBooks(): Book[] {
    return books.filter((book) => book.isNew);
  }

  getEbooks(): Book[] {
    return books.filter((book) => book.ebook);
  }

  getById(id: number): Book | undefined {
    return books.find((book) => book.id === id);
  }

  getByCategory(category: string): Book[] {
    return books.filter((book) => book.category === category);
  }

  search(query: string): Book[] {
    return books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default new BooksService();