import type {
    SortOption,
    SortSelectProps,
} from "./SortSelect.types";

import styles from "./SortSelect.module.css";

export function SortSelect({
    value,
    onChange,
}: SortSelectProps) {
    return (
        <div className={styles.container}>
            <label htmlFor="sort">
                Ordenar por
            </label>

            <select
                id="sort"
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value as SortOption
                    )
                }
            >
                <option value="">
                    Mais relevantes
                </option>

                <option value="price-asc">
                    Menor preço
                </option>

                <option value="price-desc">
                    Maior preço
                </option>

                <option value="rating">
                    Melhor avaliação
                </option>

                <option value="bestseller">
                    Mais vendidos
                </option>
            </select>
        </div>
    );
}