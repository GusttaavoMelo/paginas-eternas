import { Link } from "react-router-dom";

import { books } from "../../../data";

import { BookCard } from "../../books/BookCard/BookCard";

import styles from "./FeaturedBooks.module.css";

export function FeaturedBooks() {
    const featuredBooks = books.filter(
        (book) => book.featured
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            Seleção especial
                        </span>

                        <h2>
                            Livros em destaque
                        </h2>

                        <p>
                            Histórias que merecem
                            um lugar especial na
                            sua estante.
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
                    {featuredBooks.map((book) => (
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