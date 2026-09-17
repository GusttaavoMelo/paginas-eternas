import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import {
    User,
    Heart,
    ShoppingCart,
    LogOut,
    Mail,
} from "lucide-react";

import {
    useAuth,
} from "../../contexts/AuthContext/AuthContext";

import type { Order } from "../../types/Order/Order.types";

import styles from "./Account.module.css";

export function Account() {
    const navigate = useNavigate();

    const {
        user,
        logout,
        updateUser,
    } = useAuth();

    const orders = useMemo<Order[]>(() => {
        const storedOrders =
            localStorage.getItem("paginas-eternas-orders");

        if (!storedOrders) {
            return [];
        }

        const allOrders: Order[] =
            JSON.parse(storedOrders);

        return allOrders.filter(
            (order) => order.userId === user?.id
        );
    }, [user?.id]);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSave = () => {
        if (!name.trim() || !email.trim()) {
            return;
        }

        updateUser(
            name.trim(),
            email.trim()
        );

        setIsEditing(false);
    };

    if (!user) {
        return null;
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.icon}>
                        <User size={32} />
                    </div>

                    <div>
                        <span className={styles.eyebrow}>
                            Páginas Eternas
                        </span>

                        <h1>Minha conta</h1>

                        <p>
                            Gerencie seus dados e acesse
                            rapidamente suas opções.
                        </p>
                    </div>
                </header>

                <section className={styles.profile}>
                    <div className={styles.profileHeader}>
                        <div>
                            <h2>Meus dados</h2>
                            <p>Informações da sua conta</p>
                        </div>

                        {isEditing ? (
                            <div className={styles.editActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        setName(user.name);
                                        setEmail(user.email);
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className={styles.saveButton}
                                    onClick={handleSave}
                                >
                                    Salvar
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className={styles.editButton}
                                onClick={() => setIsEditing(true)}
                            >
                                Editar dados
                            </button>
                        )}
                    </div>

                    <div className={styles.profileContent}>
                        <div className={styles.avatar}>
                            <User size={32} />
                        </div>

                        <div className={styles.info}>
                            <div className={styles.field}>
                                <span className={styles.label}>Nome</span>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className={styles.input}
                                    />
                                ) : (
                                    <span className={styles.value}>
                                        {user.name}
                                    </span>
                                )}
                            </div>

                            <div className={styles.field}>
                                <span className={styles.label}>E-mail</span>

                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className={styles.input}
                                    />
                                ) : (
                                    <div className={styles.email}>
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.grid}>
                    <Link
                        to="/favorites"
                        className={styles.card}
                    >
                        <Heart size={24} />

                        <div>
                            <h3>Meus favoritos</h3>

                            <p>
                                Veja os livros que você
                                salvou para ler depois.
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/cart"
                        className={styles.card}
                    >
                        <ShoppingCart size={24} />

                        <div>
                            <h3>Meu carrinho</h3>

                            <p>
                                Confira os produtos que
                                você adicionou ao carrinho.
                            </p>
                        </div>
                    </Link>
                </section>

                <section className={styles.orders}>
                    <div className={styles.ordersHeader}>
                        <div>
                            <h2>Meus pedidos</h2>
                            <p>Confira o histórico das suas compras.</p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className={styles.emptyOrders}>
                            <p>Você ainda não realizou nenhum pedido.</p>
                            <Link
                                to="/catalog"
                                className={styles.ordersButton}
                            >
                                Explorar catálogo
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.ordersList}>
                            {orders.map((order) => (
                                <article
                                    key={order.id}
                                    className={styles.orderCard}
                                >
                                    <div className={styles.orderInfo}>
                                        <span>Número do pedido</span>
                                        <strong>{order.orderNumber}</strong>
                                    </div>

                                    <div className={styles.orderInfo}>
                                        <span>Itens</span>
                                        <strong>{order.totalItems}</strong>
                                    </div>

                                    <div className={styles.orderInfo}>
                                        <span>Total</span>
                                        <strong>
                                            R$ {order.totalPrice
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </strong>
                                    </div>
                                    <div className={styles.orderInfo}>
                                        <span>Data</span>
                                        <strong>
                                            {new Date(order.createdAt).toLocaleDateString(
                                                "pt-BR"
                                            )}
                                        </strong>
                                    </div>
                                    <Link
                                        to={`/account/orders/${order.id}`}
                                        className={styles.detailsButton}
                                    >
                                        Ver detalhes
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <button
                    type="button"
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    Sair da conta
                </button>
            </div>
        </main>
    );
}