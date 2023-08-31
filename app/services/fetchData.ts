import axios from "axios";
const token = process.env.NEXT_PUBLIC_SECRET_TOKEN;
 const TOKEN = `Bearer FeMsA@2022`;
 const TOKEN2 = 'Bearer JOSEBOZZONE';

/*const URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "https://femsa.weareblive.io/api/v3/comerciales";*/

    const URL = "https://femsa.weareblive.io/api/v3/comerciales";
    const URL2 = "https://femsa.weareblive.io/api/v3/back";



export async function fetchData(path: string) {
  try {
    const response = await fetch(`${URL}/${path}`, {
      headers: {
        Authorization: `${TOKEN}`,
      },
    });
    console.log('response11111', response)
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    const data = await response.json();
    console.log('fetchData', data)
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export const getMisiones = async (id: number) => {
 
  const objectId = {client_id: id.toString()}
  //console.log('idddddddd', objectId)
  const response = await axios.post(`${URL}/missions`, 
    objectId,
    {headers: { Authorization: TOKEN },}
  );
  const data = await response.data;
  //console.log('missions', data)
  return data;
} 
export const getImperdibles = async (id: number) => {
  const objectId = {client_id: id.toString()}
  const response = await axios.post(`${URL}/imperdibles`, 
  objectId,
  {headers: { Authorization: TOKEN },}
  );
  const data = await response.data;
  //console.log('imperdibles', data)
  return data;
} 

export const getExchanges = async (id: number) => {
  const objectId =  id.toString()
  const response = await axios.get(`${URL2}/canjes/by_client/${id.toString()}`, 
  {
    headers: { Authorization: TOKEN2 },
  });
  const data = await response.data;
  console.log('exchanges', data)
  return data;
} 



/*export const getProductos = async () => {
  const response = await axios.get(`${URL}/products`, {
    headers: { Authorization: TOKEN },
  });
  const data = await response.data;
  console.log('dataproductos', data)
  return data;
} */