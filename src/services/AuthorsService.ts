import { authors } from "../data/authors";
import type { Author } from "../types/Author";

class AuthorsService {
    getAll(): Author[] {
        return authors;
    }

    getById(id: number): Author | undefined {
        return authors.find((author) => author.id === id);
    }
}

export default new AuthorsService();