import { Link, useNavigate } from "react-router-dom";

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

import styles from "./Account.module.css";

export function Account() {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
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
                        <h2>Meus dados</h2>
                        <p>Informações da sua conta</p>
                    </div>

                    <div className={styles.profileContent}>
                        <div className={styles.avatar}>
                            <User size={32} />
                        </div>

                        <div className={styles.info}>
                            <div className={styles.field}>
                                <span className={styles.label}>Nome</span>
                                <span className={styles.value}>
                                    {user.name}
                                </span>
                            </div>

                            <div className={styles.field}>
                                <span className={styles.label}>E-mail</span>

                                <div className={styles.email}>
                                    <Mail size={16} />
                                    <span>{user.email}</span>
                                </div>
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