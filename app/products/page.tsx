"use client";
import { useState } from "react";
import { useFetchProducts } from "../hooks";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Product } from "../models/Product";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authClientContext";
import { Loader, Searchbar } from "../components";
import { useTheme } from "../context/themeContext";
type Props = {};
export default function Products({}: Props) {
  const { theme } = useTheme();

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { products, loading } = useFetchProducts();

  const [searchProduct, setSearchProduct] = useState("");

  const filteredProducts = products.filter((product: Product) =>
    product.detail.toLowerCase().includes(searchProduct.toLowerCase())
  );

  if (loading) return <Loader />;

  return !isAuthenticated ? (
    router.push("/login")
  ) : (
    <Box
      className={`w-full py-1 px-3 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Searchbar
        search={searchProduct}
        setSearch={setSearchProduct}
        placeholder="Buscar producto"
      />
      <nav className="h-[77vh] overflow-y-auto">
        <List>
          {filteredProducts.map((product: Product) => (
            <ListItem
              className={`${
                theme === "dark"
                  ? "border border-gray-200 text-gray-100 bg-gray-900"
                  : "border border-gray-800"
              } border  my-1 rounded-md`}
              disablePadding
              key={product.SKU}
            >
              <ListItemButton>
                <div className="flex justify-between flex-row items-center w-full">
                  <div className="flex flex-row">
                    <ListItemIcon
                      className={`${theme === "dark" && "text-white"}`}
                    >
                      <KeyboardArrowRightIcon />
                    </ListItemIcon>

                    <ListItemText primary={product.detail} />
                  </div>
                  <div>
                    <ListItemText
                      secondaryTypographyProps={{
                        color: `${theme !== "dark" && "#828181"}`,
                      }}
                      secondary={`$${product.price}`}
                    />
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
