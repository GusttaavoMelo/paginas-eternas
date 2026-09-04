import { Outlet } from "react-router-dom";

import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";

export function MainLayout() {
    return (
        <>
            <Header />
            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    );
}