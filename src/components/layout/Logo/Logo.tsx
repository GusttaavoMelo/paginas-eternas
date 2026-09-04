import styles from "./Logo.module.css";

interface LogoProps {
    size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
    return (
        <div className={`${styles.logo} ${styles[size]}`}>
            <span className={styles.icon}>📚</span>

            <div className={styles.text}>
                <h1>Páginas Eternas</h1>
                <p>Onde cada página guarda uma nova aventura.</p>
            </div>
        </div>
    );
}