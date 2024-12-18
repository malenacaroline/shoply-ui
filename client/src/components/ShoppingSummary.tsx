import { useState, useMemo } from "react";
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

type DiscountType = "get3For2Discount" | "vipDiscount";
type UserType = "VIP" | "common";
type User = {
  type: UserType;
  discount: DiscountType[];
};

const user: User = {
type: "VIP",
discount: ["get3For2Discount", "vipDiscount"],
};

// const user: User = {
//   type: "common",
//   discount: ["get3For2Discount"],
// };

type CartTotal = {
  subTotal: number;
  get3For2Discount: number;
  vipDiscount: number;
};

const SummaryTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "1rem",
  marginBottom: "1rem",
  color: "#3a3a3a",
  fontFamily: "Montserrat, sans-serif",
});

const Total = styled(Typography)({
  fontWeight: "600",
  fontSize: "1rem",
  margin: "1rem 0",
  color: "#e65a5a",
  fontFamily: "Montserrat, sans-serif",
});

const calculateGet3For2Discount = (cart: CartItem[]) => {
  const numCartItems = cart.reduce(
    (totalQuantity, item) => totalQuantity + item.quantity,
    0
  );

  const discountStartCount = 3;
  if (numCartItems < discountStartCount) return 0;

  const lowestPriceItem = cart.reduce((lowest, item) => {
    if (!lowest) return item;
    return item.price < lowest.price ? item : lowest;
  }, null as CartItem | null);

  return lowestPriceItem ? lowestPriceItem.price : 0;
};

const discountTypes = {
  vipDiscount: "15% off",
  get3For2Discount: "Get 3 for 2",
};
export default function ShoppingSummary({
  cart,
  removeFromCart,
}: {
  cart: CartItem[];
  removeFromCart: (item: Product) => void;
}) {

  const cartTotal = useMemo<CartTotal>(() => {
    const subTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vipDiscount = subTotal * 0.15;
    const get3For2Discount = calculateGet3For2Discount(cart);

    return {
      subTotal,
      get3For2Discount,
      vipDiscount,
    };
  }, [cart, user]);

  const discountType = useMemo(() => {
    return user.discount.reduce((currentDiscount, discountType) => {
      if (!currentDiscount) return discountType;
      return cartTotal[discountType] > cartTotal[currentDiscount]
        ? discountType
        : currentDiscount;
    }, null as DiscountType | null);
  }, [cartTotal, user]);


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
                  <Typography variant="body1" sx={{ mr: 2, fontWeight: "600" }}>
                    {`$${(item.price * item.quantity).toFixed(2)}`}
                  </Typography>
                </ListItem>
              ))}{" "}
            </List>
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Subtotal</span>
                <span>${cartTotal.subTotal.toFixed(2)}</span>
              </Typography>
              {discountType && cartTotal[discountType] > 0 && <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#169b24",
                }}
              >
                <span>Discount</span>
                <span>{`- $${cartTotal[discountType].toFixed(2)} (${discountTypes[discountType]})`}</span>
              </Typography>}
              <Total sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total</span>
                <span>${(cartTotal.subTotal - (discountType ? cartTotal[discountType] : 0)).toFixed(2)}</span>
              </Total>
              {discountType && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Recomendation: {discountTypes[discountType]}</span>
                </Typography>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
