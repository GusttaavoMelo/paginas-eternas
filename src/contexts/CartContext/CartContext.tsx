import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Book } from "../../types/Book";

import type {
    CartContextData,
    CartItem,
} from "./CartContext.types";

const CartContext =
    createContext<CartContextData | undefined>(
        undefined
    );

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({
    children,
}: CartProviderProps) {
    const [cartItems, setCartItems] =
        useState<CartItem[]>(() => {
            const storedCart =
                localStorage.getItem(
                    "paginas-eternas-cart"
                );

            if (!storedCart) {
                return [];
            }

            try {
                return JSON.parse(
                    storedCart
                ) as CartItem[];
            } catch {
                return [];
            }
        });

    useEffect(() => {
        localStorage.setItem(
            "paginas-eternas-cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (book: Book) => {
        if (!book.inStock || book.stock <= 0) {
            return;
        }

        setCartItems((currentItems) => {
            const existingItem =
                currentItems.find(
                    (item) =>
                        item.book.id === book.id
                );

            if (existingItem) {
                if (
                    existingItem.quantity >=
                    book.stock
                ) {
                    return currentItems;
                }

                return currentItems.map((item) =>
                    item.book.id === book.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    book,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    item.book.id !== bookId
            )
        );
    };

    const updateQuantity = (
        bookId: number,
        quantity: number
    ) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.book.id !== bookId) {
                    return item;
                }

                const limitedQuantity =
                    Math.min(
                        quantity,
                        item.book.stock
                    );

                return {
                    ...item,
                    quantity: limitedQuantity,
                };
            })
        );
    };

    const increaseQuantity = (
        bookId: number
    ) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.book.id !== bookId) {
                    return item;
                }

                if (
                    item.quantity >=
                    item.book.stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity:
                        item.quantity + 1,
                };
            })
        );
    };

    const decreaseQuantity = (
        bookId: number
    ) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.book.id === bookId
                        ? {
                              ...item,
                              quantity:
                                  item.quantity - 1,
                          }
                        : item
                )
                .filter(
                    (item) => item.quantity > 0
                )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getItemQuantity = (
        bookId: number
    ) => {
        const item = cartItems.find(
            (item) =>
                item.book.id === bookId
        );

        return item?.quantity ?? 0;
    };

    const getTotalItems = () => {
        return cartItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) =>
                total +
                item.book.price *
                    item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                getItemQuantity,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context =
        useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart deve ser usado dentro de CartProvider."
        );
    }

    return context;
}