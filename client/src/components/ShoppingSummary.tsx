import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Product } from "../types";
import { CartItem } from "./ShoppingCart";

const SummaryTitle = styled(Typography)({
  fontSize: "1rem",
  marginBottom: "1rem",
  color: "#293f9c",
  fontFamily: "Montserrat, sans-serif",
});

const Total = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "1rem",
  color: "#293f9c",
  fontFamily: "Montserrat, sans-serif",
});

export default function ShoppingSummary({
  cart,
  total,
  removeFromCart,
}: {
  cart: CartItem[];
  total: number;
  removeFromCart: (item: Product) => void;
}) {
  return (
    <Card>
      <CardContent>
        <SummaryTitle>Order Summary</SummaryTitle>
        {cart.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <List>
              {cart.map((item, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeFromCart(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
                  />
                </ListItem>
              ))}{" "}
            </List>
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Total
                variant="h6"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </Total>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
