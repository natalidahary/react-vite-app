import { useCartStore } from "@/stores/cartStore";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components";
import { useTranslation } from "react-i18next";

export const CartSidebar = () => {
  const { t } = useTranslation("common");
  const { isOpen, closeSidebar } = useSidebar();
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <h3>{t("cart.title")}</h3>

        {items.length === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <Button
                  className="cart-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  {t("cart.remove")}
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Button className="cart-button" onClick={closeSidebar}>
          {t("cart.close")}
        </Button>

        {items.length > 0 && (
          <Button className="cart-button" onClick={clearCart}>
            {t("cart.clear")}
          </Button>
        )}
      </div>
    </>
  );
};