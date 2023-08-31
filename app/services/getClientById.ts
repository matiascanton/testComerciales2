import { Client } from "../models/Client";

const TOKEN = 'Bearer FeMsA@2022'
/*const URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "https://femsa.weareblive.io/api/v3/comerciales";*/

const URL = "https://femsa.weareblive.io/api/v3/comerciales";

export async function getClientById(id: number): Promise<Client> {
  try {
   // console.log('id', id)
    //const response = await fetch(`${URL}/info/client/${id}`);
    const response = await fetch(`${URL}/info/client/${id.toString()}`, 
      {
        headers: { Authorization: TOKEN },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching clients");
    }
    const data = await response.json();
    console.log('getClientByIddddddddddddd', data)
    return data[0];
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      id: 0,
      business_name: "",
      channel_group: "",
      gec: "",
      address: "",
      enabled: false,
      // Asegúrate de incluir todas las propiedades requeridas en el objeto Client
    }; // Devuelve un objeto literal vacío
  }
}
