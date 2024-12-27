import { Card, CardContent, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Cart, Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { brown, orange } from "@mui/material/colors";

export interface ProductItemProps {
  item: Product;
}

const fetchProductInCart = (cart: Cart | null, product: Product) => {
  if (!cart) return 0;
  const productInCart = cart.items.find(
    (item) => item.productId === product.id
  );
  if (!productInCart) return 0;
  return productInCart.quantity;
};

export const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { cart, loading, addItemToCart, removeItemFromCart } = useCart();
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        sx={{ padding: "20px", objectFit: "contain" }}
        image={item.image}
        alt={item.name}
      />
      <CardContent component={Stack} spacing={1}>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" color={brown[600]}>
            {item.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color={orange[800]}>
            ${item.price.toFixed(2)}
          </Typography>
        </Stack>
        {cart && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              onClick={() => removeItemFromCart(item.id)}
              size="small"
              disabled={loading}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography>{fetchProductInCart(cart, item)}</Typography>
            <IconButton
              onClick={() => addItemToCart(item.id)}
              size="small"
              disabled={loading}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
