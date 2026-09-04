import styles from "./Navbar.module.css";

const links = [
    "Home",
    "Livros",
    "Mangás",
    "HQs",
    "E-books",
    "Autores",
    "Promoções",
];

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.menu}>
                {links.map((link) => (
                    <li key={link}>
                        <a href="#">{link}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}