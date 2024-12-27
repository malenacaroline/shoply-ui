import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ShoppingSummary from "./ShoppingSummary";
import { ProductItem } from "./ProductItem";
import { Product } from "../types";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { brown } from "@mui/material/colors";
import { Stack } from "@mui/material";

const PageTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  fontFamily: "Montserrat, sans-serif",
});

export default function ShoppingCart() {
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
      <PageTitle color={brown[600]}>Products</PageTitle>
      <Grid
        container
        spacing={4}
        direction={{ xs: "column-reverse", md: "row" }}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm:6, md: 4 }}>
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
}
