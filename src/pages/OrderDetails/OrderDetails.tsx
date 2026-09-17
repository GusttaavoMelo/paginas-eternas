import {
    Link,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    Package,
} from "lucide-react";

import type { Order } from "../../types/Order/Order.types";

import styles from "./OrderDetails.module.css";

export function OrderDetails() {
    const { id } = useParams();

    const storedOrders =
        localStorage.getItem("paginas-eternas-orders");

    const orders: Order[] = storedOrders
        ? JSON.parse(storedOrders)
        : [];

    const order = orders.find(
        (item) => item.id === id
    );

    if (!order) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <Package size={48} />

                    <h1>Pedido não encontrado</h1>

                    <p>
                        Não foi possível encontrar os
                        detalhes deste pedido.
                    </p>

                    <Link
                        to="/account"
                        className={styles.backButton}
                    >
                        <ArrowLeft size={18} />
                        Voltar para minha conta
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link
                    to="/account"
                    className={styles.backLink}
                >
                    <ArrowLeft size={18} />
                    Voltar para minha conta
                </Link>

                <header className={styles.header}>
                    <div className={styles.icon}>
                        <Package size={32} />
                    </div>

                    <div>
                        <span className={styles.eyebrow}>
                            Páginas Eternas
                        </span>

                        <h1>Detalhes do pedido</h1>

                        <p>
                            Pedido {order.orderNumber}
                        </p>
                    </div>
                </header>

                <section className={styles.card}>
                    <div className={styles.orderHeader}>
                        <div>
                            <span>Número do pedido</span>

                            <strong>
                                {order.orderNumber}
                            </strong>
                        </div>

                        <div>
                            <span>Data</span>

                            <strong>
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString(
                                    "pt-BR"
                                )}
                            </strong>
                        </div>

                        <div>
                            <span>Status</span>

                            <span className={styles.status}>
                                {order.status === "confirmed"
                                    ? "Pedido confirmado"
                                    : order.status === "pending"
                                        ? "Pagamento pendente"
                                        : order.status === "shipped"
                                            ? "Pedido enviado"
                                            : "Pedido entregue"}
                            </span>
                        </div>
                    </div>

                    <div className={styles.divider} />

                    <section className={styles.customerInfo}>
                        <h2>Dados da entrega</h2>

                        <div className={styles.infoGroup}>
                            <span>CPF</span>

                            <strong>
                                {order.cpf ?? "Não informado"}
                            </strong>
                        </div>

                        <div className={styles.infoGroup}>
                            <span>Telefone</span>

                            <strong>
                                {order.phone ?? "Não informado"}
                            </strong>
                        </div>

                        <div className={styles.infoGroup}>
                            <span>Endereço</span>

                            <strong>
                                {order.address
                                    ? `${order.address.street}, ${order.address.number}${order.address.complement
                                        ? ` - ${order.address.complement}`
                                        : ""
                                    }`
                                    : "Não informado"}
                            </strong>
                        </div>

                        <div className={styles.infoGroup}>
                            <span>Localização</span>

                            <strong>
                                {order.address
                                    ? `${order.address.cep} - ${order.address.city} / ${order.address.state}`
                                    : "Não informado"}
                            </strong>
                        </div>
                    </section>

                    <div className={styles.divider} />

                    <section className={styles.customerInfo}>
                        <h2>Pagamento</h2>

                        <div className={styles.infoGroup}>
                            <span>Forma de pagamento</span>

                            <strong>
                                {order.payment === "credit-card"
                                    ? "Cartão de crédito"
                                    : order.payment === "pix"
                                        ? "PIX"
                                        : order.payment === "boleto"
                                            ? "Boleto bancário"
                                            : "Não informado"}
                            </strong>
                        </div>
                    </section>

                    <div className={styles.divider} />

                    <div className={styles.items}>
                        {order.items.map((item) => (
                            <div
                                key={item.bookId}
                                className={styles.item}
                            >
                                <img
                                    src={item.cover}
                                    alt={item.title}
                                />

                                <div className={styles.itemInfo}>
                                    <h2>
                                        {item.title}
                                    </h2>

                                    <span>
                                        Quantidade:{" "}
                                        {item.quantity}
                                    </span>

                                    <div className={styles.itemPrice}>
                                        <span>
                                            R${" "}
                                            {item.price
                                                .toFixed(2)
                                                .replace(
                                                    ".",
                                                    ","
                                                )}{" "}
                                            por unidade
                                        </span>

                                        <strong>
                                            R${" "}
                                            {(
                                                item.price *
                                                item.quantity
                                            )
                                                .toFixed(2)
                                                .replace(
                                                    ".",
                                                    ","
                                                )}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.summary}>
                        <h2>Resumo do pedido</h2>

                        <div className={styles.summaryRow}>
                            <span>Itens</span>

                            <span>
                                {order.totalItems}
                            </span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>

                            <span>
                                R${" "}
                                {order.totalPrice
                                    .toFixed(2)
                                    .replace(
                                        ".",
                                        ","
                                    )}
                            </span>
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.total}>
                            <span>Total do pedido</span>

                            <strong>
                                R${" "}
                                {order.totalPrice
                                    .toFixed(2)
                                    .replace(
                                        ".",
                                        ","
                                    )}
                            </strong>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}