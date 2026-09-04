import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

import { useFavorites } from "../../contexts/FavoritesContext/FavoritesContext";

import { BookCard } from "../../components/books/BookCard/BookCard";

import styles from "./Favorites.module.css";

export function Favorites() {
    const { favorites } = useFavorites();

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>Meus favoritos</h1>

                    <p>
                        Livros que você guardou para
                        ler depois.
                    </p>
                </div>

                <Heart size={32} />
            </header>

            {favorites.length === 0 ? (
                <div className={styles.empty}>
                    <Heart size={48} />

                    <h2>
                        Você ainda não tem favoritos
                    </h2>

                    <p>
                        Explore nosso catálogo e
                        adicione os livros que você
                        mais gostar.
                    </p>

                    <Link
                        to="/catalog"
                        className={styles.button}
                    >
                        Explorar catálogo
                    </Link>
                </div>
            ) : (
                <div className={styles.grid}>
                    {favorites.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}