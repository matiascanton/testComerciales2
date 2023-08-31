import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Button,
} from "@mui/material";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowRight";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { useAuth } from "@/app/context/authClientContext";

type Props = {
  theme: "dark" | "light";
};
export default function FooterButtons({ theme }: Props) {
  const { logout } = useAuth();

  const footerButtons = [
    /*{
      icon: (
        <CardGiftcardIcon
          className={`${theme === "dark" && "text-gray-300"}`}
        />
      ),
      label: "Mis puntos KOFRE",
    },*/
    {
      icon: (
        <HeadsetMicIcon className={`${theme === "dark" && "text-gray-300"}`} />
      ),
      label: "Contacto",
    },
  ];

  return (
    <div className="flex flex-col">
      {footerButtons.map((item, i) => (
        <div
          key={i}
          className=" h-20 bg-gray-500/20 my-1 rounded-md py-2 px-3 flex items-center justify-center"
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          <ListItemText
            className={`${theme === "dark" && "text-gray-300"}`}
            primary={item.label}
          />

          <ListItemIcon>
            <KeyboardArrowLeftIcon
              className={`${theme === "dark" && "text-gray-300"}`}
              fontSize="large"
            />
          </ListItemIcon>
        </div>
      ))}
      <ButtonGroup variant="text" className="w-full">
        <Button
          className="bg-red-500 w-full"
          variant="contained"
          color="error"
          onClick={() => logout()}
        >
          CERRAR SESION
        </Button>
      </ButtonGroup>
    </div>
  );
}
