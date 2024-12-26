import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShoppingSummary from "./ShoppingSummary";
import { ProductItem, ProductItemProps } from "./ProductItem";
import { Product } from "../types";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export interface CartItem extends Product {
  quantity: number;
}

const PageTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  fontFamily: "Montserrat, sans-serif",
  color: "#555555",
});

export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const productsWithImages = response.data.map((product: Product) => ({
          ...product,
          image: "shopping-bag.jpg", // Set a default image or map from the API response if available
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <PageTitle>Products</PageTitle>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductItem
                key={product.id}
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
        <ShoppingSummary cart={cart} removeFromCart={removeFromCart} />
      </Grid>
    </Grid>
  );
}
