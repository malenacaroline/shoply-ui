import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShoppingSummary from "./ShoppingSummary";
import { ProductItem, ProductItemProps } from "./ProductItem";
import { Product } from "../types";
import { styled } from "@mui/material/styles";

export interface CartItem extends Product {
  quantity: number;
}

const PageTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  fontFamily: "Montserrat, sans-serif",
  color: "#555555",
});

const initialProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt",
    price: 35.99,
    image: "shopping-bag.jpg",
  },
  {
    id: 2,
    name: "Jeans",
    price: 65.50,
    image: "shopping-bag.jpg",
  },
  {
    id: 3,
    name: "Dress",
    price: 80.75,
    image: "shopping-bag.jpg",
  },
  { 
    id: 4,
    name: "Hat",
    price: 14.99,
    image: "shopping-bag.jpg",
  },
  {
    id: 5,
    name: "Socks",
    price: 9.99,
    image: "shopping-bag.jpg",
  },
  {
    id: 6,
    name: "Jacket",
    price: 89.99,
    image: "shopping-bag.jpg",
  },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart: ProductItemProps["addToCart"] = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart: ProductItemProps["removeFromCart"] = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== product.id);
    });
  };

  const getCartItemCount: ProductItemProps["getCartItemCount"] = (product) => {
    const item = cart.find((item) => item.id === product.id);
    return item ? item.quantity : 0;
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <PageTitle>Products</PageTitle>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {initialProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductItem
                item={product}
                getCartItemCount={getCartItemCount}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <ShoppingSummary
          cart={cart}
          removeFromCart={removeFromCart}
        />
      </Grid>
    </Grid>
  );
}
