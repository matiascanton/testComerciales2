import { Mission } from "@/app/models/Mission";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";

type Props = {
  missions: Mission[];
  theme: "dark" | "light";
};

export default function Missions({ missions, theme }: Props) {
  return (
    <div>
      <p className="font-bold text-sm text-center">MISIONES</p>

      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100vw" }}
          size="small"
          aria-label="a dense table"
          className={`${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className={`${theme === "dark" && "text-gray-400"}`}>
                  SKU
                </span>
              </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody className="w-screen">
            {missions.slice(0, 6).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell size="small" component="th" scope="row">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                    {row.skus[0]}
                  </span>
                </TableCell>
                <TableCell size="small" align="left">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                    {row.label}
                  </span>
                </TableCell>
                <TableCell size="small" align="center">
                  <span className={`${theme === "dark" && "text-gray-200"}`}>
                    {row.qty}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
