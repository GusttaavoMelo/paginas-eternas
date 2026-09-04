import { Hero } from "../../components/home/Hero/Hero";
import { Categories } from "../../components/home/Categories/Categories";
import { FeaturedBooks } from "../../components/home/FeaturedBooks/FeaturedBooks";
import { Bestsellers } from "../../components/home/Bestsellers/Bestsellers";
import { NewBooks } from "../../components/home/NewBooks/NewBooks";

export function Home() {
    return (
        <main>
            <Hero />

            <Categories />

            <FeaturedBooks />

            <Bestsellers />

            <NewBooks />
        </main>
    );
}