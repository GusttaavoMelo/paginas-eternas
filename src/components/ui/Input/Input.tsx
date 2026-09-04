import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export function Input({
    className = "",
    ...props
}: InputProps) {
    return (
        <input
            className={`${styles.input} ${className}`}
            {...props}
        />
    );
}