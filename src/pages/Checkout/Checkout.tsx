import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CreditCard,
    ShoppingBag,
} from "lucide-react";
import {
    useForm,
} from "react-hook-form";
import {
    zodResolver,
} from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCart } from "../../contexts/CartContext/CartContext";

import styles from "./Checkout.module.css";

const checkoutSchema = z.object({
    name: z
        .string()
        .min(3, "Digite seu nome completo."),

    email: z
        .string()
        .email("Digite um e-mail válido."),

    cpf: z
        .string()
        .min(11, "Digite um CPF válido."),

    phone: z
        .string()
        .min(10, "Digite um telefone válido."),

    cep: z
        .string()
        .min(8, "Digite um CEP válido."),

    street: z
        .string()
        .min(3, "Digite sua rua."),

    number: z
        .string()
        .min(1, "Digite o número."),

    complement: z
        .string()
        .optional(),

    city: z
        .string()
        .min(2, "Digite sua cidade."),

    state: z
        .string()
        .length(2, "Digite a sigla do estado."),

    payment: z
        .enum([
            "credit-card",
            "pix",
            "boleto",
        ]),
});

type CheckoutFormData =
    z.infer<typeof checkoutSchema>;

export function Checkout() {
    const {
        cartItems,
        getTotalItems,
        getTotalPrice,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            payment: "credit-card",
            complement: "",
        },
    });

    const onSubmit = (
        data: CheckoutFormData
    ) => {
        console.log("Pedido:", data);
        console.log("Itens:", cartItems);

        const orderNumber = `PE-${Date.now()
            .toString()
            .slice(-8)}`;

        clearCart();

        navigate("/order-success", {
            state: {
                orderNumber,
                totalItems,
                totalPrice,
            },
        });
    };

    if (cartItems.length === 0) {
        return (
            <main className={styles.page}>
                <div className={styles.empty}>
                    <ShoppingBag size={56} />

                    <h1>
                        Seu carrinho está vazio
                    </h1>

                    <p>
                        Adicione algum produto ao
                        carrinho antes de finalizar
                        sua compra.
                    </p>

                    <Link
                        to="/catalog"
                        className={styles.button}
                    >
                        Voltar ao catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <button
                    type="button"
                    className={styles.back}
                    onClick={() => navigate("/cart")}
                >
                    <ArrowLeft size={18} />
                    Voltar ao carrinho
                </button>

                <header className={styles.header}>
                    <div>
                        <span
                            className={styles.eyebrow}
                        >
                            Páginas Eternas
                        </span>

                        <h1>
                            Finalizar compra
                        </h1>

                        <p>
                            Preencha seus dados
                            para finalizar o pedido.
                        </p>
                    </div>

                    <CreditCard size={32} />
                </header>

                <form
                    className={styles.content}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <section
                        className={
                            styles.formSection
                        }
                    >
                        <h2>
                            Dados pessoais
                        </h2>

                        <div
                            className={
                                styles.formGrid
                            }
                        >
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
                                    placeholder="Seu nome completo"
                                    {...register("name")}
                                />

                                {errors.name && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.name
                                                .message
                                        }
                                    </span>
                                )}
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
                                    placeholder="seu@email.com"
                                    {...register("email")}
                                />

                                {errors.email && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.email
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="cpf">
                                    CPF
                                </label>

                                <input
                                    id="cpf"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    {...register("cpf")}
                                />

                                {errors.cpf && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.cpf
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="phone">
                                    Telefone
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    {...register("phone")}
                                />

                                {errors.phone && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.phone
                                                .message
                                        }
                                    </span>
                                )}
                            </div>
                        </div>

                        <h2
                            className={
                                styles.sectionTitle
                            }
                        >
                            Endereço de entrega
                        </h2>

                        <div
                            className={
                                styles.formGrid
                            }
                        >
                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="cep">
                                    CEP
                                </label>

                                <input
                                    id="cep"
                                    type="text"
                                    placeholder="00000-000"
                                    {...register("cep")}
                                />

                                {errors.cep && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.cep
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="street">
                                    Rua
                                </label>

                                <input
                                    id="street"
                                    type="text"
                                    placeholder="Nome da rua"
                                    {...register("street")}
                                />

                                {errors.street && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.street
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="number">
                                    Número
                                </label>

                                <input
                                    id="number"
                                    type="text"
                                    placeholder="123"
                                    {...register("number")}
                                />

                                {errors.number && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.number
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="complement">
                                    Complemento
                                </label>

                                <input
                                    id="complement"
                                    type="text"
                                    placeholder="Apartamento, bloco..."
                                    {...register(
                                        "complement"
                                    )}
                                />
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="city">
                                    Cidade
                                </label>

                                <input
                                    id="city"
                                    type="text"
                                    placeholder="Sua cidade"
                                    {...register("city")}
                                />

                                {errors.city && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.city
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field
                                }
                            >
                                <label htmlFor="state">
                                    Estado
                                </label>

                                <input
                                    id="state"
                                    type="text"
                                    placeholder="SP"
                                    maxLength={2}
                                    {...register("state")}
                                />

                                {errors.state && (
                                    <span
                                        className={
                                            styles.error
                                        }
                                    >
                                        {
                                            errors.state
                                                .message
                                        }
                                    </span>
                                )}
                            </div>
                        </div>

                        <h2
                            className={
                                styles.sectionTitle
                            }
                        >
                            Forma de pagamento
                        </h2>

                        <div
                            className={
                                styles.paymentOptions
                            }
                        >
                            <label
                                className={
                                    styles.paymentOption
                                }
                            >
                                <input
                                    type="radio"
                                    value="credit-card"
                                    {...register(
                                        "payment"
                                    )}
                                />

                                <span>
                                    Cartão de crédito
                                </span>
                            </label>

                            <label
                                className={
                                    styles.paymentOption
                                }
                            >
                                <input
                                    type="radio"
                                    value="pix"
                                    {...register(
                                        "payment"
                                    )}
                                />

                                <span>
                                    PIX
                                </span>
                            </label>

                            <label
                                className={
                                    styles.paymentOption
                                }
                            >
                                <input
                                    type="radio"
                                    value="boleto"
                                    {...register(
                                        "payment"
                                    )}
                                />

                                <span>
                                    Boleto bancário
                                </span>
                            </label>

                            {errors.payment && (
                                <span
                                    className={
                                        styles.error
                                    }
                                >
                                    Selecione uma forma
                                    de pagamento.
                                </span>
                            )}
                        </div>
                    </section>

                    <aside
                        className={
                            styles.summary
                        }
                    >
                        <h2>
                            Resumo do pedido
                        </h2>

                        <div
                            className={
                                styles.products
                            }
                        >
                            {cartItems.map(
                                (item) => (
                                    <div
                                        key={
                                            item.book.id
                                        }
                                        className={
                                            styles.product
                                        }
                                    >
                                        <img
                                            src={
                                                item.book
                                                    .cover
                                            }
                                            alt={`Capa do livro ${ item.book.title } `}
                                        />

                                        <div>
                                            <h3>
                                                {
                                                    item
                                                        .book
                                                        .title
                                                }
                                            </h3>

                                            <span>
                                                {
                                                    item.quantity
                                                }{" "}
                                                {item.quantity ===
                                                1
                                                    ? "unidade"
                                                    : "unidades"}
                                            </span>
                                        </div>

                                        <strong>
                                            R${" "}
                                            {(
                                                item.book
                                                    .price *
                                                item.quantity
                                            )
                                                .toFixed(
                                                    2
                                                )
                                                .replace(
                                                    ".",
                                                    ","
                                                )}
                                        </strong>
                                    </div>
                                )
                            )}
                        </div>

                        <div
                            className={
                                styles.divider
                            }
                        />

                        <div
                            className={
                                styles.summaryRow
                            }
                        >
                            <span>
                                Produtos
                            </span>

                            <span>
                                {totalItems}
                            </span>
                        </div>

                        <div
                            className={
                                styles.summaryTotal
                            }
                        >
                            <span>
                                Total
                            </span>

                            <strong>
                                R${" "}
                                {totalPrice
                                    .toFixed(2)
                                    .replace(
                                        ".",
                                        ","
                                    )}
                            </strong>
                        </div>

                        <button
                            type="submit"
                            className={
                                styles.checkoutButton
                            }
                        >
                            Finalizar pedido
                        </button>

                        <p
                            className={
                                styles.security
                            }
                        >
                            🔒 Seus dados serão tratados
                            com segurança.
                        </p>
                    </aside>
                </form>
            </div>
        </main>
    );
}