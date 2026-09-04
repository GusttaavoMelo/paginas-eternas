import { Search } from "lucide-react";

import type { SearchInputProps } from "./SearchInput.types";

import styles from "./SearchInput.module.css";

export function SearchInput({
    value,
    onChange,
}: SearchInputProps) {
    return (
        <div className={styles.search}>
            <Search size={18} />

            <input
                type="text"
                placeholder="Pesquisar livros..."
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            />
        </div>
    );
}