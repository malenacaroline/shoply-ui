import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box, Container } from "@mui/material";
import { AuthProvider, CartProvider } from "./contexts";
import { Header, ShoppingCart, Footer } from "./components";

const theme = createTheme();

function MainContent() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <ShoppingCart />
      </Container>
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
