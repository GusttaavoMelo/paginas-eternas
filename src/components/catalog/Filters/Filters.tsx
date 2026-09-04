import { authors, categories } from "../../../data";

import styles from "./Filters.module.css";

type PriceRange =
    | ""
    | "under-50"
    | "50-70"
    | "70-100"
    | "over-100";

interface FiltersProps {
    selectedCategory: string;
    selectedAuthor: number | null;
    selectedPrice: PriceRange;

    onCategoryChange: (category: string) => void;
    onAuthorChange: (authorId: number | null) => void;
    onPriceChange: (price: PriceRange) => void;

    onClearFilters: () => void;
}

export function Filters({
    selectedCategory,
    selectedAuthor,
    selectedPrice,
    onCategoryChange,
    onAuthorChange,
    onPriceChange,
    onClearFilters,
}: FiltersProps) {
    return (
        <aside className={styles.filters}>
            <h2>Filtros</h2>

            <button
                type="button"
                className={styles.clearButton}
                onClick={onClearFilters}
            >
                Limpar filtros
            </button>
            
            {/* CATEGORIAS */}

            <div className={styles.group}>
                <h3>Categoria</h3>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ""}
                        onChange={() =>
                            onCategoryChange("")
                        }
                    />

                    <span>Todas</span>
                </label>

                {categories.map((category) => (
                    <label
                        key={category.id}
                        className={styles.option}
                    >
                        <input
                            type="radio"
                            name="category"
                            value={category.slug}
                            checked={
                                selectedCategory ===
                                category.slug
                            }
                            onChange={() =>
                                onCategoryChange(
                                    category.slug
                                )
                            }
                        />

                        <span>
                            {category.icon}{" "}
                            {category.name}
                        </span>
                    </label>
                ))}
            </div>

            {/* AUTORES */}

            <div className={styles.group}>
                <h3>Autor</h3>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="author"
                        value=""
                        checked={selectedAuthor === null}
                        onChange={() =>
                            onAuthorChange(null)
                        }
                    />

                    <span>Todos</span>
                </label>

                {authors.map((author) => (
                    <label
                        key={author.id}
                        className={styles.option}
                    >
                        <input
                            type="radio"
                            name="author"
                            value={author.id}
                            checked={
                                selectedAuthor ===
                                author.id
                            }
                            onChange={() =>
                                onAuthorChange(
                                    author.id
                                )
                            }
                        />

                        <span>{author.name}</span>
                    </label>
                ))}
            </div>
            <div className={styles.group}>
                <h3>Preço</h3>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="price"
                        value=""
                        checked={selectedPrice === ""}
                        onChange={() =>
                            onPriceChange("")
                        }
                    />

                    <span>Todos</span>
                </label>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="price"
                        value="under-50"
                        checked={
                            selectedPrice === "under-50"
                        }
                        onChange={() =>
                            onPriceChange("under-50")
                        }
                    />

                    <span>Até R$ 50</span>
                </label>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="price"
                        value="50-70"
                        checked={
                            selectedPrice === "50-70"
                        }
                        onChange={() =>
                            onPriceChange("50-70")
                        }
                    />

                    <span>R$ 50 – R$ 70</span>
                </label>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="price"
                        value="70-100"
                        checked={
                            selectedPrice === "70-100"
                        }
                        onChange={() =>
                            onPriceChange("70-100")
                        }
                    />

                    <span>R$ 70 – R$ 100</span>
                </label>

                <label className={styles.option}>
                    <input
                        type="radio"
                        name="price"
                        value="over-100"
                        checked={
                            selectedPrice === "over-100"
                        }
                        onChange={() =>
                            onPriceChange("over-100")
                        }
                    />

                    <span>Acima de R$ 100</span>
                </label>
            </div>
        </aside>
    );
}