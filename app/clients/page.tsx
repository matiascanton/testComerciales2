"use client";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useFetchClients } from "../hooks";
import { Client } from "../models/Client";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authClientContext";
import { Loader } from "../components";
import Searchbar from "../components/searchbar";
import { useTheme } from "../context/themeContext";

export default function Clients() {
  const { theme } = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { clients, loading } = useFetchClients();
  const [searchCLient, setSearchCLient] = useState("");

  const filteredClients = clients.filter((client: Client) =>
    client.business_name.toLowerCase().includes(searchCLient.toLowerCase())
  );

  

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/loginuser');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) return <Loader />;

  return (
    <Box
      className={`w-full h-full py-1 px-3 overflow-hidden ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Searchbar
        search={searchCLient}
        setSearch={setSearchCLient}
        placeholder="Buscar cliente"
      />

      <nav className="h-[77vh] overflow-y-auto">
        <List>
          {filteredClients.map((client: Client) => (
            <ListItem
              className={`${
                theme === "dark"
                  ? "border border-gray-200 text-gray-100 bg-gray-900"
                  : "border border-gray-800"
              } border my-1 rounded-md`}
              disablePadding
              key={client.id}
              onClick={() => router.push(`/clients/${client.id}`)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <KeyboardArrowRightIcon
                    className={`${theme === "dark" && "text-white"}`}
                  />
                </ListItemIcon>
                <div className="">
                  <ListItemText primary={client.business_name} />
                  <ListItemText
                    secondary={client.address}
                    className="text-gray-400"
                    secondaryTypographyProps={{
                      color: `${theme !== "dark" && "#828181"}`,
                    }}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
