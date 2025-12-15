import { useCartStore } from "@/stores/cartStore";
import { useSidebar } from "@/hooks/useSidebar";
import { SharedButton } from "@/components";

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
                <SharedButton
                  className="cart-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </SharedButton>
              </li>
            ))}
          </ul>
        )}

        <SharedButton className="cart-button" onClick={closeSidebar}>
          Close
        </SharedButton>

        {items.length > 0 && (
          <>
           <SharedButton className="cart-button" onClick={clearCart}>
            Clear Cart
          </SharedButton>
          </>
        )}
      </div>
    </>
  );
};