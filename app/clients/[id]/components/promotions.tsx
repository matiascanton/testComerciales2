import { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTheme } from "@/app/context/themeContext";
import { Button } from "@material-tailwind/react";
type Props = {
  theme: "dark" | "light";
};
export default function Promotions({ theme }: Props) {
  /*const [dynamics, setDynamics] = useState([
    { id: 1, dynamic: "Dinamica 1 - Promo 20%", entregado: ''},
    { id: 2, dynamic: "Dinamica 2 - Promo 25%", entregado: '' },
    { id: 3, dynamic: "Dinamica 3 - Promo 30%", entregado: '' },
    { id: 4, dynamic: "Dinamica 4 - Promo 35%", entregado: '' },
    { id: 5, dynamic: "Dinamica 5 - Promo 40%", entregado: '' },
    { id: 6, dynamic: "Dinamica 6 - Promo 45%", entregado: '' },
    { id: 7, dynamic: "Dinamica 7 - Promo 50%", entregado: '' },
    { id: 8, dynamic: "Dinamica 8 - Promo 55%", entregado: '' },
    { id: 9, dynamic: "Dinamica 9 - Promo 60%", entregado: '' },
    { id: 10, dynamic: "Dinamica 10 - Promo 65%", entregado: '' },
  ])*/
  const [dynamics, setDynamics] = useState([
    { id: 1, dynamic: "Dinamica 1 - Promo 20%", entregado: ''},
    { id: 2, dynamic: "Dinamica 2 - Promo 25%", entregado: '' },
    { id: 3, dynamic: "Dinamica 3 - Promo 30%", entregado: '' },
    { id: 4, dynamic: "Dinamica 4 - Promo 35%", entregado: '' }
  ])
  //const dynamics = 

  const handleClickDelivery = (id: number) =>{
    console.log('id', id)
    const today = new Date().toISOString().slice(0, 10); // Obtiene la fecha de hoy en formato YYYY-MM-DD
    const [year, month, day] = today.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const index = dynamics.findIndex((item) => item.id === id);
    const dynamicsAux = [...dynamics];
    dynamicsAux[index].entregado = formattedDate;
    setDynamics(dynamicsAux);
  }

  return (
    <div>
      <p className="font-bold text-sm text-center p-5">
        PROMOCIONES QR web consumidores
      </p>

      <TableContainer  className="p-3">
        <Table
          
          size="small"
          aria-label="a dense table"
          className={`p-3 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
        >
          <TableHead>
            <TableRow className="text-white">
              <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  Origen
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
            {dynamics
              //.sort(() => Math.random() - 0.5)
              //.slice(0, 3)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell size="small" component="th" scope="row">
                    <span className={`${theme === "dark" && "text-gray-200"}`}>
                      {row.dynamic}
                    </span>
                  </TableCell>
                  <TableCell size="small" align="center">
                    <span className={`${theme === "dark" && "text-gray-200"}`}>
                      {Math.floor(Math.random() * 5) + 1}
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
