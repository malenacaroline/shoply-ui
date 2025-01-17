import { useState, useEffect } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { brown } from "@mui/material/colors";
import axiosInstance from "../utils/axiosConfig";
import { ShoppingSummary, ProductItem } from "./index";
import { Product } from "../types";

export const ShoppingCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const productsWithImages = response.data.map((product: Product) => ({
          ...product,
          image: "shopping-bag.jpg",
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
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="600" color={brown[600]}>
        Products
      </Typography>
      <Grid
        container
        spacing={4}
        direction={{ xs: "column-reverse", md: "row" }}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductItem key={product.id} item={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ShoppingSummary />
        </Grid>
      </Grid>
    </Stack>
  );
};
