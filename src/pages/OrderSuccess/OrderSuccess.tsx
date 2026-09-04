import {
    Link,
    useLocation,
} from "react-router-dom";

import {
    CheckCircle,
    ShoppingBag,
} from "lucide-react";

import styles from "./OrderSuccess.module.css";

interface OrderSuccessState {
    orderNumber: string;
    totalItems: number;
    totalPrice: number;
}

export function OrderSuccess() {
    const location = useLocation();

    const state =
        location.state as OrderSuccessState | null;

    const orderNumber =
        state?.orderNumber ?? "PE-00000000";

    const totalItems =
        state?.totalItems ?? 0;

    const totalPrice =
        state?.totalPrice ?? 0;
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <CheckCircle size={72} />
                </div>

                <span className={styles.eyebrow}>
                    Páginas Eternas
                </span>

                <h1>
                    Pedido realizado com sucesso!
                </h1>

                <p className={styles.description}>
                    Obrigado pela sua compra. Seu pedido
                    foi recebido e está sendo preparado.
                </p>

                <section className={styles.card}>
                    <div className={styles.orderNumber}>
                        <span>Número do pedido</span>
                        <strong>{orderNumber}</strong>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.row}>
                        <span>Itens</span>
                        <strong>{totalItems}</strong>
                    </div>

                    <div className={styles.row}>
                        <span>Total</span>
                        <strong>
                            R$ {totalPrice
                                .toFixed(2)
                                .replace(".", ",")}
                        </strong>
                    </div>
                </section>

                <div className={styles.actions}>
                    <Link
                        to="/catalog"
                        className={styles.button}
                    >
                        <ShoppingBag size={18} />
                        Continuar comprando
                    </Link>
                </div>
            </div>
        </main>
    );
}