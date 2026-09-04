import type { Book } from "../types/Book";

export const books: Book[] = [
    {
        id: 1,

        title: "O Caminho das Estrelas",

        authorId: 1,

        category: "fantasia",

        description:
            "Uma jornada épica por reinos antigos em busca de um artefato capaz de mudar o destino do mundo.",

        publisher: "Editora Horizonte",

        language: "Português",

        pages: 432,

        isbn: "978-85-12345-01-1",

        price: 59.9,

        oldPrice: 79.9,

        rating: 4.9,

        reviews: 325,

        cover: "/books/book1.jpg",

        featured: true,

        bestseller: true,

        ebook: true,

        isNew: true,

        stock: 18,

        inStock: true,
    },

    {
        id: 2,

        title: "Cidade de Ferro",

        authorId: 2,

        category: "ficcao-cientifica",

        description:
            "Em uma metrópole futurista, uma engenheira descobre um segredo que pode mudar o futuro da humanidade.",

        publisher: "Nova Era",

        language: "Português",

        pages: 368,

        isbn: "978-85-12345-02-8",

        price: 69.9,

        oldPrice: 89.9,

        rating: 4.8,

        reviews: 198,

        cover: "/books/book2.jpg",

        featured: true,

        bestseller: false,

        ebook: true,

        isNew: true,

        stock: 9,

        inStock: true,
    },

    {
        id: 3,

        title: "Entre Sombras",

        authorId: 3,

        category: "terror",

        description:
            "Uma pequena cidade esconde acontecimentos inexplicáveis que desafiam a lógica e a coragem de seus moradores.",

        publisher: "Noite Eterna",

        language: "Português",

        pages: 290,

        isbn: "978-85-12345-03-5",

        price: 44.9,

        rating: 4.7,

        reviews: 154,

        cover: "/books/book3.jpg",

        featured: false,

        bestseller: true,

        ebook: false,

        isNew: false,

        stock: 6,

        inStock: true,
    },
];