import { CategoriesService } from "../services";

export function useCategories() {
    return {
        categories: CategoriesService.getAll(),
    };
}