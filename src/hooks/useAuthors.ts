import { AuthorsService } from "../services";

export function useAuthors() {
    return {
        authors: AuthorsService.getAll(),
    };
}