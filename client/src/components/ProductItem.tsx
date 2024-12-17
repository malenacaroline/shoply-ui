import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import { Product } from "../types";
import { styled } from "@mui/material/styles";

export interface ProductItemProps {
  item: Product;
  getCartItemCount: (item: Product) => number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
}

const ItemTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "1rem",
  fontFamily: "Montserrat, sans-serif",
});

export const ProductItem: React.FC<ProductItemProps> = ({
  item,
  getCartItemCount,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        sx={{ padding: "20px" }}
        image={item.image}
        alt={item.name}
      />
      <CardContent>
        <ItemTitle>
          {item.name}
        </ItemTitle>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <IconButton onClick={() => removeFromCart(item)}>
            <RemoveIcon />
          </IconButton>
          <Typography>{getCartItemCount(item)}</Typography>
          <IconButton onClick={() => addToCart(item)}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
