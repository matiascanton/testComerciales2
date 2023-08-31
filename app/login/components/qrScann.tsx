import { useTheme } from "@/app/context/themeContext";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useState } from "react";
import QrReader from "react-qr-reader";

type Props = {
  scan: boolean;
  validateUser: (code: number) => void;
  setScan: (value: boolean) => void;
};
export default function QrScann({ validateUser, scan, setScan }: Props) {
  const { theme } = useTheme();

  const handleScan = (data: any) => {
    if (data) {
      const code = parseInt(data);

      validateUser(code);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  const previewStyle = {
    height: 100,
    width: 500,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return !scan ? (
    <div
      className="flex flex-col justify-center items-center gap-3 h-full"
      onClick={() => setScan(true)}
    >
      <QrCodeScannerIcon
        fontSize="large"
        style={{
          fontSize: "5rem",
          color: `${theme === "dark" ? "#fff" : "#000"}`,
        }}
      />
      <p
        className={`${
          theme === "dark" ? "text-white" : "text-gray-900"
        } font-semibold text-md text-center`}
      >
        ESCANEAR QR CLIENTE
      </p>
    </div>
  ) : (
    <div className="absolute">
      <QrReader
        delay={500}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
}
