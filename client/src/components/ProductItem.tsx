import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Cart, Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { Stack } from "@mui/material";
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
  const { cart, addItemToCart, removeItemFromCart } = useCart();
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
          <Typography
            variant="subtitle1"
            color={brown[600]}
          >
            {item.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold" 
            color={orange[800]}>
            ${item.price.toFixed(2)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton onClick={() => removeItemFromCart(item.id)} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography>{fetchProductInCart(cart, item)}</Typography>
          <IconButton onClick={() => addItemToCart(item.id)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};
