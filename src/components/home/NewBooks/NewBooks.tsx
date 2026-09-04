import { Link } from "react-router-dom";

import { books } from "../../../data";

import { BookCard } from "../../books/BookCard/BookCard";

import styles from "./NewBooks.module.css";

export function NewBooks() {
    const newBooks = books.filter(
        (book) => book.isNew
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            Acabaram de chegar
                        </span>

                        <h2>Novidades</h2>

                        <p>
                            Confira as histórias mais
                            recentes da nossa coleção.
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
                    {newBooks.map((book) => (
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