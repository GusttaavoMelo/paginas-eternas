import { categories } from "../data/categories";
import type { Category } from "../types/Category";

class CategoriesService {
    getAll(): Category[] {
        return categories;
    }

    getById(id: number): Category | undefined {
        return categories.find((category) => category.id === id);
    }
}

export default new CategoriesService();