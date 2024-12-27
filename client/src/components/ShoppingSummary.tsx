import { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Typography,
  Stack,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Cart, DiscountType, CartItem, UserType } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { brown, green, red } from "@mui/material/colors";

type DiscountTotal = Record<DiscountType, number>;

const calculateGet3For2Discount = (cart: Cart["items"]) => {
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

const discountLabels = {
  [DiscountType.VIP_DISCOUNT]: "15% off",
  [DiscountType.GET_3_FOR_2_DISCOUNT]: "Get 3 for 2",
};

export default function ShoppingSummary() {
  const { user } = useAuth();
  const { cart } = useCart();

  const [selectedDiscount, setSelectedDiscount] = useState<DiscountType | null>(
    null
  );

  const discountTotal = useMemo<DiscountTotal>(() => {
    if (!cart || !user) return { get3For2Discount: 0, vipDiscount: 0 };
    const vipDiscount = user.discounts.includes(DiscountType.VIP_DISCOUNT)
      ? cart.total * 0.15
      : 0;
    const get3For2Discount = calculateGet3For2Discount(cart.items);

    return {
      get3For2Discount,
      vipDiscount,
    };
  }, [cart, user]);

  const recommendedDiscount = useMemo(() => {
    if (!user) return null;
    return user.discounts.reduce((currentDiscount, discountType) => {
      if (!currentDiscount) return discountType;
      return discountTotal[discountType] > discountTotal[currentDiscount]
        ? discountType
        : currentDiscount;
    }, null as DiscountType | null);
  }, [discountTotal, user]);

  useEffect(() => {
    setSelectedDiscount(recommendedDiscount);
  }, [recommendedDiscount]);

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDiscount(event.target.value as DiscountType);
  };

  return (
    <Card>
      <CardContent>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="start"
        >
          <Typography fontWeight="600" color={brown[700]} fontSize="large">
            Order Summary
          </Typography>
          {user?.type === UserType.VIP && (
            <Chip
              label="VIP Member"
              color="secondary"
              size="small"
              sx={{ marginLeft: "24px" }}
            />
          )}
        </Stack>
        {!cart ? (
          <Stack>
            <Typography color="text.secondary">
              Login to add products in your cart.
            </Typography>
          </Stack>
        ) : (
          <Stack>
            <List>
              {cart?.items.map((item) => {
                if (item.quantity === 0) return null;
                return (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar src="shopping-bag.jpg" alt={item.product.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
                    />
                    <Typography variant="subtitle1" fontWeight="600" color={brown[800]}>
                      {`$${item.subtotal.toFixed(2)}`}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle1">Subtotal</Typography>
                <Typography>${cart?.total.toFixed(2)}</Typography>
              </Typography>
              {selectedDiscount && discountTotal[selectedDiscount] > 0 && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: green[600],
                  }}
                >
                  <Typography variant="subtitle1">
                    Discount (${discountLabels[selectedDiscount]})
                  </Typography>
                  <Typography variant="subtitle1">{`- $${discountTotal[
                    selectedDiscount
                  ].toFixed(2)}`}</Typography>
                </Typography>
              )}
              <Typography
                variant="h6"
                fontWeight="600"
                color={red[900]}
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <span>Total</span>
                <span>
                  $
                  {(
                    cart.total -
                    (selectedDiscount ? discountTotal[selectedDiscount] : 0)
                  ).toFixed(2)}
                </span>
              </Typography>
              {user?.type === UserType.VIP && user.discounts.length > 0 && (
                <Stack
                  spacing={1}
                  sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}
                >
                  <Typography
                    variant="subtitle2"
                    color={brown[700]}
                    fontWeight="600"
                  >
                    Available Discounts
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                    }}
                  >
                    <RadioGroup
                      aria-label="discount-recommendation"
                      name="discount-recommendation"
                      value={selectedDiscount}
                      onChange={handleDiscountChange}
                    >
                      {user.discounts.map((discount) => (
                        <FormControlLabel
                          key={discount}
                          value={discount}
                          slotProps={{
                            typography: {
                              variant: "body2",
                              color: "text.secondary",
                            },
                          }}
                          control={<Radio color="secondary" size="small" />}
                          label={`Use ${discountLabels[discount]}${
                            selectedDiscount === discount
                              ? " (Recommended)"
                              : ""
                          }`}
                        />
                      ))}
                    </RadioGroup>
                  </Paper>
                </Stack>
              )}
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
