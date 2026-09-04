import type { Book } from "../../types/Book";

export interface CartItem {
    book: Book;
    quantity: number;
}

export interface CartContextData {
    cartItems: CartItem[];

    addToCart: (book: Book) => void;

    removeFromCart: (
        bookId: number
    ) => void;

    updateQuantity: (
        bookId: number,
        quantity: number
    ) => void;

    increaseQuantity: (
        bookId: number
    ) => void;

    decreaseQuantity: (
        bookId: number
    ) => void;

    clearCart: () => void;

    getItemQuantity: (
        bookId: number
    ) => number;

    getTotalItems: () => number;

    getTotalPrice: () => number;
}