import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    ArrowLeft,
    LogIn,
} from "lucide-react";

import { useState } from "react";

import {
    useAuth,
} from "../../contexts/AuthContext/AuthContext";

import styles from "./Login.module.css";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        const success = login(
            email,
            password
        );

        if (!success) {
            setError(
                "E-mail ou senha inválidos."
            );
            return;
        }

        const from =
            location.state?.from?.pathname ??
            "/";

        navigate(from);
    };

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link
                    to="/"
                    className={styles.back}
                >
                    <ArrowLeft size={18} />
                    Voltar para a loja
                </Link>

                <section className={styles.card}>
                    <div className={styles.icon}>
                        <LogIn size={28} />
                    </div>

                    <div className={styles.header}>
                        <span
                            className={
                                styles.eyebrow
                            }
                        >
                            Páginas Eternas
                        </span>

                        <h1>
                            Bem-vindo de volta
                        </h1>

                        <p>
                            Entre na sua conta para
                            continuar sua experiência.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                    >
                        {error && (
                            <div
                                className={
                                    styles.error
                                }
                            >
                                {error}
                            </div>
                        )}

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="email">
                                E-mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="seu@email.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="password">
                                Senha
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={
                                styles.submit
                            }
                        >
                            <LogIn size={18} />
                            Entrar
                        </button>
                    </form>

                    <div
                        className={
                            styles.register
                        }
                    >
                        <span>
                            Ainda não tem uma conta?
                        </span>

                        <Link to="/register">
                            Criar uma conta
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}