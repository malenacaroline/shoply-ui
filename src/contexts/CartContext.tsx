import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../contexts";
import { Cart } from "../types";

type CartActions = "add" | "remove";

interface CartContextType {
  cart: Cart | null;
  addItemToCart: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`carts/${userId}`);
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCartItems();
    else setCart(null);
  }, [userId]);

  const updateItemQuantity = async (productId: number, action: CartActions) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`carts/${cart?.id}`, {
        productId,
        action,
      });
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(`Error ${action === "add" ? "adding" : "removing"} item`);
    }
  };

  const addItemToCart = (productId: number) => {
    updateItemQuantity(productId, "add");
  }

  const removeItemFromCart = (productId: number) =>
    updateItemQuantity(productId, "remove");

  const value = useMemo(
    () => ({
      cart,
      addItemToCart,
      removeItemFromCart,
      loading
    }),
    [cart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
