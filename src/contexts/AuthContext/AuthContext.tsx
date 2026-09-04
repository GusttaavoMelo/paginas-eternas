import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type {
    AuthContextData,
    User,
} from "./AuthContext.types";

const AuthContext =
    createContext<AuthContextData | undefined>(
        undefined
    );

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] =
        useState<User | null>(() => {
            const storedUser =
                localStorage.getItem(
                    "paginas-eternas-user"
                );

            if (!storedUser) {
                return null;
            }

            try {
                return JSON.parse(
                    storedUser
                ) as User;
            } catch {
                return null;
            }
        });

    const register = (
        name: string,
        email: string,
        password: string
    ) => {
        const storedUsers =
            localStorage.getItem(
                "paginas-eternas-users"
            );

        const users: User[] = storedUsers
            ? JSON.parse(storedUsers)
            : [];

        const existingUser = users.find(
            (item) =>
                item.email.toLowerCase() ===
                email.toLowerCase()
        );

        if (existingUser) {
            throw new Error(
                "Este e-mail já está cadastrado."
            );
        }

        const newUser: User = {
            id: Date.now(),
            name,
            email,
            password,
        };

        const updatedUsers = [
            ...users,
            newUser,
        ];

        localStorage.setItem(
            "paginas-eternas-users",
            JSON.stringify(updatedUsers)
        );

        setUser(newUser);
    };

    const login = (
        email: string,
        password: string
    ) => {
        const storedUsers =
            localStorage.getItem(
                "paginas-eternas-users"
            );

        const users: User[] = storedUsers
            ? JSON.parse(storedUsers)
            : [];

        const authenticatedUser =
            users.find(
                (item) =>
                    item.email.toLowerCase() ===
                    email.toLowerCase() &&
                    item.password === password
            );

        if (!authenticatedUser) {
            return false;
        }

        setUser(authenticatedUser);

        return true;
    };

    const logout = () => {
        setUser(null);

        localStorage.removeItem(
            "paginas-eternas-user"
        );
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "paginas-eternas-user",
                JSON.stringify(user)
            );
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated:
                    user !== null,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider."
        );
    }

    return context;
}