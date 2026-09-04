export type SortOption =
    | ""
    | "price-asc"
    | "price-desc"
    | "rating"
    | "bestseller";

export interface SortSelectProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}