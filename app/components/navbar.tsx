import Image from "next/image";
import logo from "../../public/assets/logo.png";
import SwitchTheme from "./switch";
import Person from "@mui/icons-material/Person";
import ArrowBack from "@mui/icons-material/ArrowBack"
import Tab from "@mui/material/Tab";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const isProfilePage = usePathname() === '/profile';
  console.log('isProfilePage', isProfilePage)

  const handleClick = () => {
    if (isProfilePage) {
      // Redirigir a la página anterior
      router.back();
    } else {
      // Ir a la página de perfil
      router.push('/profile');
    }
  };
  return (
    <div style={{minHeight: '80px'}} className="bg-white/10 backdrop-blur-sm flex justify-center items-center w-screen py-2 border-4 border-gray-700/50 rounded-br-3xl rounded-bl-3xl shadow-xl border-t-0 z-50 h-20 max-h-20 overflow-hidden">
       <div className="absolute left-0 ml-0">

        <Tab
            icon={isProfilePage ? <ArrowBack style={{ fontSize: '30px' }} /> : <Person style={{ fontSize: '30px' }} />}
            onClick={handleClick}
            //disabled={!isAuthenticated && index !== 0}
          />
      </div>
      <Image height={50} src={logo} alt="logo" />
      {/*<div className="absolute right-0 mr-0">
        <SwitchTheme />
  </div>*/}
    </div>
  );
}
