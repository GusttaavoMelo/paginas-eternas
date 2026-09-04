import { BookCard } from "../BookCard";
import { Section } from "../../common/Section";

import type { BookSectionProps } from "./BookSection.types";

import styles from "./BookSection.module.css";

export function BookSection({
    title,
    subtitle,
    books,
}: BookSectionProps) {
    return (
        <Section
            title={title}
            subtitle={subtitle}
            actionText="Ver todos"
        >
            <div className={styles.grid}>
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </Section>
    );
}