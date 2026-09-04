import { useQuery } from "@tanstack/react-query";

import { BooksService } from "../services";

export function useBooks() {
    return useQuery({
        queryKey: ["books"],
        queryFn: () => Promise.resolve(BooksService.getAll()),
    });
}