export interface Book {
    id: number;

    title: string;

    authorId: number;

    category: string;

    description: string;

    publisher: string;

    language: string;

    pages: number;

    isbn: string;

    price: number;

    oldPrice?: number;

    rating: number;

    reviews: number;

    cover: string;

    featured: boolean;

    bestseller: boolean;

    ebook: boolean;

    isNew: boolean;

    stock: number;

    inStock: boolean;
}