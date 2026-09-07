import {
  Heart,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Container } from "../Container";
import { Logo } from "../Logo";
import { SearchBar } from "../../search/SearchBar";

import {
  useCart,
} from "../../../contexts/CartContext/CartContext";

import {
  useAuth,
} from "../../../contexts/AuthContext/AuthContext";

import styles from "./Header.module.css";

export function Header() {
  const { getTotalItems } =
    useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const totalItems =
    getTotalItems();

  return (
    <header
      className={styles.header}
    >
      <Container>
        <div
          className={styles.content}
        >
          <Logo />

          <SearchBar
            className={
              styles.search
            }
          />

          <div
            className={
              styles.actions
            }
          >
            <Link
              to="/favorites"
              className={
                styles.action
              }
              aria-label="Favoritos"
            >
              <Heart
                size={22}
              />
            </Link>

            <Link
              to="/cart"
              className={
                styles.action
              }
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              <ShoppingCart
                size={22}
              />

              {totalItems > 0 && (
                <span
                  className={
                    styles.cartBadge
                  }
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className={styles.userName}
                >
                  Olá,{" "}
                  {user?.name}
                </Link>

                <button
                  type="button"
                  className={
                    styles.action
                  }
                  aria-label="Sair da conta"
                  onClick={
                    logout
                  }
                >
                  <LogOut
                    size={
                      22
                    }
                  />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={
                  styles.action
                }
                aria-label="Entrar"
              >
                <User
                  size={
                    22
                  }
                />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}