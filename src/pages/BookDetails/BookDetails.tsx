import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";

import { books, authors } from "../../data";

import { useFavorites } from "../../contexts/FavoritesContext/FavoritesContext";
import { useCart } from "../../contexts/CartContext/CartContext";

import styles from "./BookDetails.module.css";

export function BookDetails() {
    const { id } = useParams();

    const book = books.find(
        (book) => book.id === Number(id)
    );

    const {
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    const { addToCart } = useCart();

    if (!book) {
        return (
            <main className={styles.notFound}>
                <h1>Livro não encontrado</h1>

                <p>
                    O livro que você está procurando
                    não existe.
                </p>

                <Link to="/catalog">
                    Voltar para o catálogo
                </Link>
            </main>
        );
    }

    const author = authors.find(
        (author) => author.id === book.authorId
    );

    const favorite = isFavorite(book.id);

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
        <main className={styles.page}>
            <Link
                to="/catalog"
                className={styles.back}
            >
                <ArrowLeft size={18} />
                Voltar para o catálogo
            </Link>

            <section className={styles.details}>
                <div className={styles.coverWrapper}>
                    <img
                        src={book.cover}
                        alt={`Capa do livro ${book.title}`}
                        className={styles.cover}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.badges}>
                        {book.isNew && (
                            <span>
                                Novo
                            </span>
                        )}

                        {book.bestseller && (
                            <span>
                                Mais vendido
                            </span>
                        )}

                        {hasDiscount && (
                            <span>
                                -{discountPercentage}%
                            </span>
                        )}
                    </div>

                    <h1>{book.title}</h1>

                    <p className={styles.author}>
                        por{" "}
                        <strong>
                            {author?.name ??
                                "Autor desconhecido"}
                        </strong>
                    </p>

                    <div className={styles.rating}>
                        <Star
                            size={20}
                            fill="currentColor"
                        />

                        <strong>
                            {book.rating}
                        </strong>

                        <span>
                            ({book.reviews} avaliações)
                        </span>
                    </div>

                    <p className={styles.description}>
                        {book.description}
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
                                    .replace(
                                        ".",
                                        ","
                                    )}
                            </span>
                        )}

                        <strong>
                            R${" "}
                            {book.price
                                .toFixed(2)
                                .replace(
                                    ".",
                                    ","
                                )}
                        </strong>
                    </div>

                    <div className={styles.stock}>
                        {book.inStock
                            ? "Em estoque"
                            : "Indisponível"}
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={
                                styles.favorite
                            }
                            onClick={() =>
                                toggleFavorite(book)
                            }
                        >
                            <Heart
                                size={20}
                                fill={
                                    favorite
                                        ? "currentColor"
                                        : "none"
                                }
                            />

                            {favorite
                                ? "Remover dos favoritos"
                                : "Adicionar aos favoritos"}
                        </button>

                        <button
                            type="button"
                            className={
                                styles.cart
                            }
                            disabled={!book.inStock}
                            onClick={() =>
                                addToCart(book)
                            }
                        >
                            <ShoppingCart
                                size={20}
                            />

                            {book.inStock
                                ? "Adicionar ao carrinho"
                                : "Indisponível"}
                        </button>
                    </div>

                    <div className={styles.metadata}>
                        <div>
                            <span>Editora</span>
                            <strong>
                                {book.publisher}
                            </strong>
                        </div>

                        <div>
                            <span>Idioma</span>
                            <strong>
                                {book.language}
                            </strong>
                        </div>

                        <div>
                            <span>Páginas</span>
                            <strong>
                                {book.pages}
                            </strong>
                        </div>

                        <div>
                            <span>ISBN</span>
                            <strong>
                                {book.isbn}
                            </strong>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}