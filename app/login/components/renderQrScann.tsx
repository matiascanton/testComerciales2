import { useAuth } from "@/app/context/authClientContext";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import QrScann from "./qrScann";
import { useTheme } from "@/app/context/themeContext";
import { isMale } from "@/app/utils/isMale";

export default function RenderQrScann() {
  const [scan, setScan] = useState(false);
  const { userAuth, validateUser, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-2xl flex flex-col items-center justify-center p-10 border-4 border-gray-600/30 shadow-xl w-full h-2/4 relative overflow-hidden ${
        theme === "dark" && "bg-gray-900"
      } `}
    >
      {/*
      {!isAuthenticated ? (
        <>
          {scan && (
            <button
              onClick={() => setScan(false)}
              className="absolute right-0 top-0 z-50"
            >
              <CloseIcon className="text-red-600 font-bold" />
            </button>
          )}
          <QrScann scan={scan} setScan={setScan} validateUser={validateUser} />
        </>
      ) : (
        <div
          className={`font-bold text-2xl ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }  transition-all text-center`}
        >
          <span>
            ¡{isMale(userAuth[0].name) ? "Bienvenido" : "Bienvenida"}{" "}
            {userAuth[0].name}!
          </span>
        </div>
      )}*/ }
<>
          {scan && (
            <button
              onClick={() => setScan(false)}
              className="absolute right-0 top-0 z-50"
            >
              <CloseIcon className="text-red-600 font-bold" />
            </button>
          )}
          <QrScann scan={scan} setScan={setScan} validateUser={validateUser} />
        </>

    </div>
  );
}
