import { Link } from "react-router-dom";

import styles from "./Hero.module.css";

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.eyebrow}>
                    📚 Páginas Eternas
                </span>

                <h1>
                    Onde cada página guarda
                    <span> uma nova aventura.</span>
                </h1>

                <p>
                    Encontre livros, mangás, HQs e
                    e-books para acompanhar você
                    em cada jornada.
                </p>

                <div className={styles.actions}>
                    <Link
                        to="/catalog"
                        className={styles.primaryButton}
                    >
                        Explorar catálogo
                    </Link>

                    <Link
                        to="/favorites"
                        className={styles.secondaryButton}
                    >
                        Meus favoritos
                    </Link>
                </div>
            </div>
        </section>
    );
}