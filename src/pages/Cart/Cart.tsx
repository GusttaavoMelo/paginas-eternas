import { Link } from "react-router-dom";
import {
    Minus,
    Plus,
    ShoppingCart,
    Trash2,
} from "lucide-react";

import { useCart } from "../../contexts/CartContext/CartContext";

import styles from "./Cart.module.css";

export function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
    } = useCart();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (cartItems.length === 0) {
        return (
            <main className={styles.page}>
                <div className={styles.empty}>
                    <ShoppingCart size={56} />

                    <h1>
                        Seu carrinho está vazio
                    </h1>

                    <p>
                        Explore nosso catálogo e
                        encontre sua próxima aventura.
                    </p>

                    <Link
                        to="/catalog"
                        className={styles.button}
                    >
                        Explorar catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div>
                        <h1>Meu carrinho</h1>

                        <p>
                            {totalItems === 1
                                ? "1 item no carrinho"
                                : `${ totalItems } itens no carrinho`}
                        </p>
                    </div>

                    <ShoppingCart size={32} />
                </header>

                <div className={styles.content}>
                    <section className={styles.items}>
                        {cartItems.map((item) => {
                            const isMaxQuantity =
                                item.quantity >=
                                item.book.stock;

                            return (
                                <article
                                    key={item.book.id}
                                    className={styles.item}
                                >
                                    <img
                                        src={item.book.cover}
                                        alt={`Capa do livro ${ item.book.title } `}
                                        className={styles.cover}
                                    />

                                    <div className={styles.info}>
                                        <h2>
                                            {item.book.title}
                                        </h2>

                                        <p>
                                            R${" "}
                                            {item.book.price
                                                .toFixed(2)
                                                .replace(
                                                    ".",
                                                    ","
                                                )}
                                        </p>

                                        <div
                                            className={
                                                styles.actions
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.quantity
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.book.id,
                                                            item.quantity -
                                                                1
                                                        )
                                                    }
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <Minus
                                                        size={16}
                                                    />
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.book.id,
                                                            item.quantity +
                                                                1
                                                        )
                                                    }
                                                    disabled={
                                                        isMaxQuantity
                                                    }
                                                    aria-label="Aumentar quantidade"
                                                    title={
                                                        isMaxQuantity
                                                            ? "Estoque máximo atingido"
                                                            : "Aumentar quantidade"
                                                    }
                                                >
                                                    <Plus
                                                        size={16}
                                                    />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                className={
                                                    styles.remove
                                                }
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.book.id
                                                    )
                                                }
                                            >
                                                <Trash2
                                                    size={18}
                                                />

                                                Remover
                                            </button>
                                        </div>

                                        {isMaxQuantity && (
                                            <small>
                                                Estoque máximo atingido
                                                ({item.book.stock}{" "}
                                                unidades)
                                            </small>
                                        )}
                                    </div>

                                    <strong
                                        className={
                                            styles.itemTotal
                                        }
                                    >
                                        R${" "}
                                        {(
                                            item.book.price *
                                            item.quantity
                                        )
                                            .toFixed(2)
                                            .replace(
                                                ".",
                                                ","
                                            )}
                                    </strong>
                                </article>
                            );
                        })}
                    </section>

                    <aside className={styles.summary}>
                        <h2>Resumo da compra</h2>

                        <div
                            className={
                                styles.summaryRow
                            }
                        >
                            <span>Itens</span>
                            <span>{totalItems}</span>
                        </div>

                        <div
                            className={
                                styles.summaryTotal
                            }
                        >
                            <span>Total</span>

                            <strong>
                                R${" "}
                                {totalPrice
                                    .toFixed(2)
                                    .replace(
                                        ".",
                                        ","
                                    )}
                            </strong>
                        </div>

                        <Link
                            to="/checkout"
                            className={styles.checkout}
                        >
                            Finalizar compra
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    );
}