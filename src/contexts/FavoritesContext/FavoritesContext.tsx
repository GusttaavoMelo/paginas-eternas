import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Book } from "../../types/Book";

import type {
    FavoritesContextData,
} from "./FavoritesContext.types";

const FavoritesContext =
    createContext<
        FavoritesContextData | undefined
    >(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({
    children,
}: FavoritesProviderProps) {

    const [favorites, setFavorites] =
        useState<Book[]>(() => {

            const storedFavorites =
                localStorage.getItem(
                    "paginas-eternas-favorites"
                );

            if (!storedFavorites) {
                return [];
            }

            try {
                return JSON.parse(
                    storedFavorites
                ) as Book[];
            } catch {
                return [];
            }
        });

    useEffect(() => {
        localStorage.setItem(
            "paginas-eternas-favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    const isFavorite = (bookId: number) => {
        return favorites.some(
            (book) => book.id === bookId
        );
    };

    const toggleFavorite = (book: Book) => {
        setFavorites((currentFavorites) => {

            const alreadyFavorite =
                currentFavorites.some(
                    (favorite) =>
                        favorite.id === book.id
                );

            if (alreadyFavorite) {
                return currentFavorites.filter(
                    (favorite) =>
                        favorite.id !== book.id
                );
            }

            return [
                ...currentFavorites,
                book,
            ];
        });
    };

    const removeFavorite = (bookId: number) => {
        setFavorites((currentFavorites) =>
            currentFavorites.filter(
                (book) => book.id !== bookId
            )
        );
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
                removeFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context =
        useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites deve ser usado dentro de FavoritesProvider."
        );
    }

    return context;
}