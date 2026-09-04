import { Link } from "react-router-dom";

import { books } from "../../../data";

import { BookCard } from "../../books/BookCard/BookCard";

import styles from "./Bestsellers.module.css";

export function Bestsellers() {
    const bestsellerBooks = books.filter(
        (book) => book.bestseller
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            Os favoritos dos leitores
                        </span>

                        <h2>Mais vendidos</h2>

                        <p>
                            Descubra os livros que
                            conquistaram mais leitores.
                        </p>
                    </div>

                    <Link
                        to="/catalog"
                        className={styles.link}
                    >
                        Ver todos
                    </Link>
                </div>

                <div className={styles.grid}>
                    {bestsellerBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}