import { CircularProgress } from "@mui/material";
import { useTheme } from "../context/themeContext";

export default function Loader() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <CircularProgress color="error" size="4rem" className="fixed" />
    </div>
  );
}
