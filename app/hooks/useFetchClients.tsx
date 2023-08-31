"use client";

import { useEffect, useState } from "react";
import { Client } from "../models/Client";
import { fetchData, getClientById } from "../services";
import { useAuth } from "@/app/context/authClientContext";
export default function useFetchClients(id?: number) {
  const initialClient: Client = {
    id: 0,
    business_name: "",
    channel_group: "",
    gec: "",
    address: "",
    enabled: false,
  };
  const { isAuthenticated } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>(initialClient);
  const [loading, setLoading] = useState(false);
  const fetchClients = async () => {
    try {
      setLoading(true);
      if (id) {
        const client = await getClientById(id);
        console.log('cliente', client)
        if(!client){
         const cliente = { id: id,
            business_name: "",
            channel_group: "",
            gec: "",
            address: "",
            enabled: false}
            setClient(cliente);
        }else{
          setClient(client);
        }
        
      } else {
        const clients = await fetchData("clients");
        setClients(clients);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if( isAuthenticated){
      if (!clients.length) {
        fetchClients();
      }
  }
  }, []);
  return { clients, loading, client };
}
