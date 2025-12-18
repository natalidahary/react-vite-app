import { useCartStore } from "@/stores/cartStore";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components";

export const CartSidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <h3>Your Cart</h3>

        {items.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title} (x{item.quantity})</span>
                <Button
                  className="cart-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Button className="cart-button" onClick={closeSidebar}>
          Close
        </Button>

        {items.length > 0 && (
          <>
           <Button className="cart-button" onClick={clearCart}>
            Clear Cart
          </Button>
          </>
        )}
      </div>
    </>
  );
};