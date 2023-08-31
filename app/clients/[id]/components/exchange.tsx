import { useEffect, useState } from "react";
import { Exchange } from "@/app/models/Exchange";
import { Button } from "@material-tailwind/react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type Props = {
  exchanges: Exchange[];
  theme: "dark" | "light";
};
export default function Exchange({ exchanges, theme }: Props) {

  const [exchangesData, setExchangesData] = useState(exchanges)
  
  /*useEffect(() => {
    const exchangesConEntregado = exchanges.map(exchange => ({
      ...exchange,
      entregado: '', 
    }));
    setExchangesData(exchangesConEntregado)
  }, [])*/
  
  const handleClickDelivery = (id: number) =>{
    console.log('id', id)
    const today = new Date().toISOString().slice(0, 10); // Obtiene la fecha de hoy en formato YYYY-MM-DD
    const [year, month, day] = today.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const index = exchangesData.findIndex((item) => item.id === id);
    const dynamicsAux = [...exchangesData];
    dynamicsAux[index].entregado = formattedDate;
    setExchangesData(dynamicsAux);
  }

  return (
    <div>
      <p className="font-bold text-sm text-center p-5">
        CANJE DE PREMIOS - App clientes
      </p>

      <TableContainer className="p-3">
        <Table
          className={`${
            theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
          }`}
          
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
             {/* <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  SKU
                </span>
        </TableCell>*/}
              <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  Detalle
                </span>
              </TableCell>
              <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  Cantidad
                </span>
              </TableCell>
              <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  Entregado
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchanges?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/*<TableCell size="small" component="th" scope="row">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                    {row.sku}
                  </span>
            </TableCell>*/}
                <TableCell size="small" align="left">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                    {row.description}
                  </span>
                </TableCell>
                <TableCell size="small" align="center">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                  {row.qty}
                  </span>
                </TableCell>
                <TableCell size="small" align="center">
                    {row.entregado ? <span className={`${theme === "dark" && "text-green-200"}`}> {row.entregado} </span> : <Button style={{padding: 0}} variant="text" onClick={() => handleClickDelivery(row.id)}><LocalShippingIcon className="text-red-500" /></Button>}
                    
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
