import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useSearchParams,
} from "react-router-dom";

import { useBooks } from "../../hooks";
import { authors } from "../../data";

import { SearchInput } from "../../components/catalog/SearchInput";
import { Filters } from "../../components/catalog/Filters";
import { BooksGrid } from "../../components/catalog/BooksGrid";

import { SortSelect } from "../../components/catalog/SortSelect/SortSelect";

import type { SortOption } from "../../components/catalog/SortSelect/SortSelect.types";

import styles from "./Catalog.module.css";

function normalizeText(text: string) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export function Catalog() {
    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const categoryFromUrl =
        searchParams.get("category") ?? "";

    const searchFromUrl =
        searchParams.get("search") ?? "";

    const [search, setSearch] = useState(searchFromUrl);

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState(categoryFromUrl);

    const [
        selectedAuthor,
        setSelectedAuthor,
    ] = useState<number | null>(null);

    const [
        selectedPrice,
        setSelectedPrice,
    ] = useState<
        "" |
        "under-50" |
        "50-70" |
        "70-100" |
        "over-100"
    >("");

    const [
        sortBy,
        setSortBy,
    ] = useState<SortOption>("");

    useEffect(() => {
        setSelectedCategory(categoryFromUrl);
        setSearch(searchFromUrl);
    }, [categoryFromUrl, searchFromUrl]);

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("");
        setSelectedAuthor(null);
        setSelectedPrice("");
        setSortBy("");

        setSearchParams({});
    };

    const {
        data: books = [],
        isLoading,
        error,
    } = useBooks();

    const filteredBooks = useMemo(() => {
        const searchTerm = normalizeText(
            search.trim()
        );

        return books.filter((book) => {
            const author = authors.find(
                (author) =>
                    author.id === book.authorId
            );

            const authorName = normalizeText(
                author?.name ?? ""
            );

            const matchesSearch =
                !searchTerm ||
                normalizeText(book.title).includes(
                    searchTerm
                ) ||
                normalizeText(book.category).includes(
                    searchTerm
                ) ||
                authorName.includes(searchTerm);

            const matchesCategory =
                !selectedCategory ||
                book.category === selectedCategory;

            const matchesAuthor =
                selectedAuthor === null ||
                book.authorId === selectedAuthor;

            let matchesPrice = true;

            if (
                selectedPrice ===
                "under-50"
            ) {
                matchesPrice =
                    book.price < 50;
            }

            if (
                selectedPrice ===
                "50-70"
            ) {
                matchesPrice =
                    book.price >= 50 &&
                    book.price <= 70;
            }

            if (
                selectedPrice ===
                "70-100"
            ) {
                matchesPrice =
                    book.price > 70 &&
                    book.price <= 100;
            }

            if (
                selectedPrice ===
                "over-100"
            ) {
                matchesPrice =
                    book.price > 100;
            }

            return (
                matchesSearch &&
                matchesCategory &&
                matchesAuthor &&
                matchesPrice
            );
        });
    }, [
        books,
        search,
        selectedCategory,
        selectedAuthor,
        selectedPrice,
    ]);

    const sortedBooks = useMemo(() => {
        const sorted = [...filteredBooks];

        switch (sortBy) {
            case "price-asc":
                return sorted.sort(
                    (a, b) =>
                        a.price - b.price
                );

            case "price-desc":
                return sorted.sort(
                    (a, b) =>
                        b.price - a.price
                );

            case "rating":
                return sorted.sort(
                    (a, b) =>
                        b.rating - a.rating
                );

            case "bestseller":
                return sorted.sort(
                    (a, b) =>
                        Number(b.bestseller) -
                        Number(a.bestseller)
                );

            default:
                return sorted;
        }
    }, [filteredBooks, sortBy]);

    if (isLoading) {
        return (
            <main
                className={styles.catalog}
            >
                <p>
                    Carregando livros...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main
                className={styles.catalog}
            >
                <p>
                    Erro ao carregar os
                    livros.
                </p>
            </main>
        );
    }

    return (
        <main className={styles.catalog}>
            <div className={styles.header}>
                <h1>Catálogo</h1>

                <p>
                    Encontre sua próxima
                    aventura.
                </p>
            </div>

            <SearchInput
                value={search}
                onChange={(value) => {
                    setSearch(value);

                    const params = new URLSearchParams(
                        searchParams
                    );

                    if (value.trim()) {
                        params.set("search", value.trim());
                    } else {
                        params.delete("search");
                    }

                    setSearchParams(params, {
                        replace: true,
                    });
                }}
            />

            <SortSelect
                value={sortBy}
                onChange={setSortBy}
            />

            <div
                className={
                    styles.catalogToolbar
                }
            >
                <span>
                    {sortedBooks.length === 1
                        ? "1 livro encontrado"
                        : `${sortedBooks.length} livros encontrados`}
                </span>
            </div>

            <div className={styles.content}>
                <Filters
                    selectedCategory={
                        selectedCategory
                    }
                    selectedAuthor={
                        selectedAuthor
                    }
                    selectedPrice={
                        selectedPrice
                    }
                    onCategoryChange={
                        setSelectedCategory
                    }
                    onAuthorChange={
                        setSelectedAuthor
                    }
                    onPriceChange={
                        setSelectedPrice
                    }
                    onClearFilters={
                        clearFilters
                    }
                />

                {sortedBooks.length > 0 ? (
                    <BooksGrid
                        books={sortedBooks}
                    />
                ) : (
                    <div
                        className={
                            styles.emptyState
                        }
                    >
                        <span>📚</span>

                        <h2>
                            Nenhum livro
                            encontrado
                        </h2>

                        <p>
                            Tente alterar os
                            filtros ou realizar
                            uma nova busca.
                        </p>

                        <button
                            type="button"
                            onClick={
                                clearFilters
                            }
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}