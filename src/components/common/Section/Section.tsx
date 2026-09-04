import type { SectionProps } from "./Section.types";

import { Container } from "../../layout/Container";

import styles from "./Section.module.css";

export function Section({
    title,
    subtitle,
    actionText,
    onActionClick,
    children,
}: SectionProps) {
    return (
        <section className={styles.section}>
            <Container>

                <div className={styles.header}>

                    <div>
                        <h2>{title}</h2>

                        {subtitle && (
                            <p>{subtitle}</p>
                        )}

                    </div>

                    {actionText && (
                        <button onClick={onActionClick}>
                            {actionText}
                        </button>
                    )}

                </div>

                {children}

            </Container>
        </section>
    );
}