"use product";

import { useEffect, useState } from "react";
import { fetchData} from "../services/fetchData";
import { Product } from "../models/Product";
import { Exchange } from "../models/Exchange";
//import { getProducts } from "../services";
import { getMisiones, getImperdibles, getExchanges } from "../services/fetchData";
import { Mission } from "../models/Mission";
import { Unmissable } from "../models/Unmissable";
import { useAuth } from "@/app/context/authClientContext";
  

export default function useFetchProducts(id?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [missions, setMissionss] = useState<Mission[]>([]);
  const [unmissables, setUnmissables] = useState<Unmissable[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchProducts = async () => {
    try {
      console.log('hola2')
      setLoading(true);
      //const products = await getProducts();
      //const products = await fetchData(`products`);
      //const products = await getProductos();
      
      setProducts(products);
      //setLoading(true);
      //const products = await fetchData(`products`);
      if (id !== undefined) {
        const missions = await getMisiones(id);
      const unmissables = await getImperdibles(id);
      const exchanges = await getExchanges(id);
      setExchanges(exchanges)
      //setProducts(products);
      setMissionss(missions);
      setUnmissables(unmissables);
        
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if( isAuthenticated){
      fetchProducts();
    }
    
  }, []);

  return { products, loading, missions, unmissables, exchanges };
}
