import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ForkLeftIcon from "@mui/icons-material/ForkLeft";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useAuth } from "@/app/context/authClientContext";
import { SaveOutlined } from "@mui/icons-material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "@/app/models/User";

type Props = {
  keyValue: string;
  value: string;
  theme: "light" | "dark";
  userAuth: User[];
  setUserAuth: (user: User[]) => void;
};
export default function FieldUserData({
  keyValue,
  value,
  theme,
  userAuth,
  setUserAuth,
}: Props) {
  const Telefono = keyValue === "Telefono";
  const Email = keyValue === "Email";
  const renderInput = keyValue === "Email" || keyValue === "Telefono";

  const IconComponent =
    keyValue === "Nombre"
      ? PersonIcon
      : Email
      ? EmailIcon
      : Telefono
      ? PhoneIcon
      : keyValue === "Direccion"
      ? LocationOnIcon
      //: keyValue === "Ruta"
     // ? ForkLeftIcon
      : null;

  const [edit, setEdit] = useState({
    Telefono: false,
    Email: false,
  });
  const [editValue, setEditValue] = useState({
    mobile: userAuth.length ? userAuth[0]?.mobile : "",
    email: userAuth.length ? userAuth[0]?.email : "",
  });
  const handleUpdateUser = (key: string) => {
    const updatedKey = key === "Email" ? "email" : "mobile";

    const updatedUserAuth = userAuth.map((user) => {
      if (user.id === userAuth[0].id) {
        return {
          ...user,
          [updatedKey]: editValue[updatedKey],
        };
      }
      return user;
    });

    setUserAuth(updatedUserAuth);
    setEdit({
      ...edit,
      [key]: false,
    });
  };

  const handleChange = (event: any, key: string) => {
    const { value } = event.target;
    const updatedKey = key === "Email" ? "email" : "mobile";

    setEditValue({
      ...editValue,
      [updatedKey]: value,
    });
  };

  return (
    <ListItem
      className={`border-2 ${
        theme === "dark" && "bg-gray-900"
      } border-gray-500/30 my-1 rounded-md py-2 px-3`}
      disablePadding
    >
      {(edit.Email && Email) || (edit.Telefono && Telefono) ? (
        <input
          className={`w-full h-16 py-2 px-3 outline-none bg-transparent ${
            theme === "dark" && "text-white"
          }`}
          autoFocus
          onChange={(event) => handleChange(event, keyValue)}
          type={Telefono ? "number" : "text"}
          defaultValue={Telefono ? editValue.mobile : editValue.email}
        />
      ) : (
        <ListItemText>
          <div className="flex justify-start flex-row items-center w-full overflow-hidden">
            <div className="flex flex-row">
              <ListItemIcon>
                {IconComponent && (
                  <IconComponent
                    className={`${theme === "dark" && "text-white"}`}
                  />
                )}
              </ListItemIcon>
            </div>
            <div>
              <ListItemText
                secondary={keyValue}
                secondaryTypographyProps={{
                  color: `${theme === "dark" && "#828181"}`,
                }}
              />
              <ListItemText
                className={`${theme === "dark" && "text-white"}`}
                primary={value}
              />
            </div>
          </div>
        </ListItemText>
      )}
      <div className={`${theme === "dark" && "text-white"}`}>
        {/*renderInput ? (
          (!edit.Email && Email) || (!edit.Telefono && Telefono) ? (
            <button
              onClick={() => setEdit({ ...edit, [keyValue]: !edit[keyValue] })}
            >
              <EditNoteOutlinedIcon />
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => handleUpdateUser(keyValue)}>
                <SaveOutlined />
              </button>
              <button
                onClick={() => {
                  setEdit({ ...edit, [keyValue]: false });
                  setEditValue({ ...editValue, [keyValue]: "" });
                }}
              >
                <CloseIcon className="text-red-500" />
              </button>
            </div>
          )
              ) : null*/}
      </div>
    </ListItem>
  );
}
