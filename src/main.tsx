import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./config/queryClient";

import { FavoritesProvider } from "./contexts/FavoritesContext/FavoritesContext";

import { CartProvider } from "./contexts/CartContext/CartContext";

import { AuthProvider } from "./contexts/AuthContext/AuthContext";

import App from "./App.tsx";

import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <FavoritesProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FavoritesProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);