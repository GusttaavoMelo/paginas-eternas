import {
    Heart,
    ShoppingCart,
    Star,
} from "lucide-react";

import type { BookCardProps } from "./BookCard.types";

import { authors } from "../../../data";

import { useFavorites } from "../../../contexts/FavoritesContext/FavoritesContext";
import { useCart } from "../../../contexts/CartContext/CartContext";
import { Link } from "react-router-dom";

import styles from "./BookCard.module.css";

export function BookCard({ book }: BookCardProps) {

    const {
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    const {
        addToCart,
    } = useCart();

    const favorite = isFavorite(book.id);

    const author = authors.find(
        (author) => author.id === book.authorId
    );

    const hasDiscount =
        book.oldPrice !== undefined &&
        book.oldPrice > book.price;

    const discountPercentage = hasDiscount
        ? Math.round(
            ((book.oldPrice! - book.price) /
                book.oldPrice!) *
            100
        )
        : 0;

    return (
        <article className={styles.card}>
            <div className={styles.coverWrapper}>
                <Link
                    to={`/books/${book.id}`}
                    className={styles.coverLink}
                >
                    <img
                        src={book.cover}
                        alt={`Capa do livro ${book.title}`}
                        className={styles.cover}
                    />
                </Link>

                <div className={styles.badges}>
                    {book.isNew && (
                        <span className={styles.newBadge}>
                            Novo
                        </span>
                    )}

                    {book.bestseller && (
                        <span
                            className={
                                styles.bestsellerBadge
                            }
                        >
                            Mais vendido
                        </span>
                    )}

                    {hasDiscount && (
                        <span
                            className={
                                styles.discountBadge
                            }
                        >
                            -{discountPercentage}%
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className={`${styles.favorite} ${favorite ? styles.favoriteActive : ""
                        }`}
                    onClick={() => {
                        console.log("Clicou no favorito:", book.title);
                        toggleFavorite(book);
                    }}
                    aria-label={
                        favorite
                            ? `Remover ${book.title} dos favoritos`
                            : `Adicionar ${book.title} aos favoritos`
                    }
                >
                    <Heart
                        size={18}
                        fill={favorite ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.rating}>
                    <Star
                        size={16}
                        fill="currentColor"
                    />

                    <span>{book.rating}</span>

                    <span className={styles.reviews}>
                        ({book.reviews})
                    </span>
                </div>

                <Link
                    to={`/books/${book.id}`}
                    className={styles.titleLink}
                >
                    <h3 className={styles.title}>
                        {book.title}
                    </h3>
                </Link>

                <p className={styles.author}>
                    {author?.name ?? "Autor desconhecido"}
                </p>

                <div className={styles.price}>
                    {hasDiscount && (
                        <span
                            className={
                                styles.oldPrice
                            }
                        >
                            R${" "}
                            {book.oldPrice!
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>
                    )}

                    <strong>
                        R${" "}
                        {book.price
                            .toFixed(2)
                            .replace(".", ",")}
                    </strong>
                </div>

                <div className={styles.stock}>
                    {book.inStock ? (
                        <span>
                            Em estoque
                        </span>
                    ) : (
                        <span>
                            Indisponível
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className={styles.buy}
                    disabled={!book.inStock}
                    onClick={() => addToCart(book)}
                >
                    <ShoppingCart size={18} />

                    {book.inStock
                        ? "Comprar"
                        : "Indisponível"}
                </button>
            </div>
        </article>
    );
}