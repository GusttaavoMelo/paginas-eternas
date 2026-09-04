export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    register: (
        name: string,
        email: string,
        password: string
    ) => void;
    login: (
        email: string,
        password: string
    ) => boolean;
    logout: () => void;
}