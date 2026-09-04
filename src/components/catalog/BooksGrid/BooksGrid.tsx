import { BookCard } from "../../books/BookCard";

import type { BooksGridProps } from "./BooksGrid.types";

import styles from "./BooksGrid.module.css";

export function BooksGrid({ books }: BooksGridProps) {
    if (books.length === 0) {
        return (
            <p>
                Nenhum livro encontrado.
            </p>
        );
    }

    return (
        <section className={styles.grid}>
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}
        </section>
    );
}