import { Link } from "react-router-dom";

import { categories } from "../../../data";

import styles from "./Categories.module.css";

export function Categories() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            Explore
                        </span>

                        <h2>Categorias</h2>

                        <p>
                            Encontre uma nova história
                            para descobrir.
                        </p>
                    </div>

                    <Link
                        to="/catalog"
                        className={styles.link}
                    >
                        Ver catálogo
                    </Link>
                </div>

                <div className={styles.grid}>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/catalog?category=${category.slug}`}
                            className={styles.card}
                        >
                            <span className={styles.icon}>
                                {category.icon}
                            </span>

                            <h3>{category.name}</h3>

                            <span className={styles.arrow}>
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}