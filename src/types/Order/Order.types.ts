export interface OrderItem {
    bookId: number;
    title: string;
    cover: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    userId: number;
    orderNumber: string;
    status: "pending" | "confirmed" | "shipped" | "delivered";
    customerName: string;
    customerEmail: string;
    cpf: string;
    phone: string;
    address: {
        cep: string;
        street: string;
        number: string;
        complement?: string;
        city: string;
        state: string;
    };
    payment: "credit-card" | "pix" | "boleto";
    items: OrderItem[];
    totalItems: number;
    totalPrice: number;
    createdAt: string;
}