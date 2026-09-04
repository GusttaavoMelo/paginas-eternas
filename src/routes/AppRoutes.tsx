import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

// Layout
import { MainLayout } from "../layouts/MainLayout";

// Pages
import { Home } from "../pages/Home/Home";
import { Catalog } from "../pages/Catalog";
import { Favorites } from "../pages/Favorites/Favorites";
import { Cart } from "../pages/Cart/Cart";
import { BookDetails } from "../pages/BookDetails/BookDetails";
import { Checkout } from "../pages/Checkout/Checkout";
import { OrderSuccess } from "../pages/OrderSuccess/OrderSuccess";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas principais */}
                <Route element={<MainLayout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/catalog"
                        element={<Catalog />}
                    />

                    <Route
                        path="/favorites"
                        element={<Favorites />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/books/:id"
                        element={<BookDetails />}
                    />
                </Route>

                {/* Rotas do processo de compra */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />
                </Route>

                <Route
                    path="/order-success"
                    element={<OrderSuccess />}
                />

                {/* Autenticação */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>
        </BrowserRouter>
    );
}