import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../ui/Input";

import styles from "./SearchBar.module.css";

import type { SearchBarProps } from "./SearchBar.types";
import type { KeyboardEvent } from "react";

export function SearchBar({
    placeholder = "Buscar livros, mangás ou HQs...",
    onSearch,
    className,
}: SearchBarProps) {
    const [value, setValue] = useState("");

    const navigate = useNavigate();

    function handleSearch() {
        const searchTerm = value.trim();

        if (onSearch) {
            onSearch(searchTerm);
            return;
        }

        if (!searchTerm) {
            navigate("/catalog");
            return;
        }

        navigate(
            `/catalog?search=${encodeURIComponent(searchTerm)}`
        );
    }

    function handleKeyDown(
        event: KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div
            className={`${styles.searchBar} ${className ?? ""
                }`}
        >
            <Search
                className={styles.icon}
                size={20}
            />

            <Input
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                    setValue(event.target.value)
                }
                onKeyDown={handleKeyDown}
            />

            <button
                type="button"
                className={styles.button}
                onClick={handleSearch}
            >
                Buscar
            </button>
        </div>
    );
}