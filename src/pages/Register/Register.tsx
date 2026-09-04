import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    ArrowLeft,
    UserPlus,
} from "lucide-react";

import { useState } from "react";

import {
    useAuth,
} from "../../contexts/AuthContext/AuthContext";

import styles from "./Register.module.css";

export function Register() {
    const navigate = useNavigate();

    const {
        register,
        isAuthenticated,
    } = useAuth();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (password.length < 6) {
            setError(
                "A senha deve ter pelo menos 6 caracteres."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "As senhas não coincidem."
            );
            return;
        }

        try {
            register(
                name,
                email,
                password
            );

            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                return;
            }

            setError(
                "Não foi possível criar a conta."
            );
        }
    };

    if (isAuthenticated) {
        navigate("/");
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link
                    to="/login"
                    className={styles.back}
                >
                    <ArrowLeft size={18} />
                    Voltar para o login
                </Link>

                <section className={styles.card}>
                    <div className={styles.icon}>
                        <UserPlus size={28} />
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
                            Criar sua conta
                        </h1>

                        <p>
                            Cadastre-se para aproveitar
                            todos os recursos da loja.
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
                            <label htmlFor="name">
                                Nome completo
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Digite seu nome completo"
                                autoComplete="name"
                                required
                            />
                        </div>

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
                                        event.target
                                            .value
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
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Mínimo de 6 caracteres"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label htmlFor="confirmPassword">
                                Confirmar senha
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={
                                    confirmPassword
                                }
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target
                                            .value
                                    )
                                }
                                placeholder="Digite a senha novamente"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={
                                styles.submit
                            }
                        >
                            <UserPlus size={18} />
                            Criar conta
                        </button>
                    </form>

                    <div
                        className={
                            styles.login
                        }
                    >
                        <span>
                            Já possui uma conta?
                        </span>

                        <Link to="/login">
                            Entrar
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}