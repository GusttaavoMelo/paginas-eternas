import type { ReactNode } from "react";

export interface SectionProps {
    title: string;
    subtitle?: string;
    actionText?: string;
    onActionClick?: () => void;
    children: ReactNode;
}