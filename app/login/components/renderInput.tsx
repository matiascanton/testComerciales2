import { ChangeEvent, useState } from "react";
import { useAuth } from "@/app/context/authClientContext";
import OtpInput from "react18-input-otp";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@/app/context/themeContext";
import { Select, Option, Button  } from "@material-tailwind/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

type Props = {};
export default function RenderInput() {
  const { theme } = useTheme();
  const router = useRouter();
  //const [otp, setOtp] = useState(Array(9).fill(''));
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false)

  const {
    userAuth,
    password,
    error,
    validateUser,
    isAuthenticated,
    loadAuthUser,
    logout,
  } = useAuth();
  const [selectedOption, setSelectedOption] = useState('111');

  const handleChangeSelect = (event: string) => {
    console.log('event', event)
    setSelectedOption(event);
  };
  const transformArrayToInt = (arr: any[]) => {
    const reversedArr = arr.slice().reverse();
    // Eliminamos los elementos vacíos del final del array, si los hubiera
    let number = 0;

    // Recorremos el array desde el final y construimos el número
    for (let i = 0; i < reversedArr.length; i++) {
      if (reversedArr[i] !== '') {
        number = number * 10 + parseInt(reversedArr[i]);
      }
    }
  
    return number;
  };

/*const authenticate = () => {
  
  console.log('otp', otp)
  const code = transformArrayToInt(otp);
  console.log('codeeeee',selectedOption + code)
  const codeNumber = parseInt(selectedOption + code)
  //validateUser(codeNumber);
  router.push(`/clients/${codeNumber}`)
  setLoading(false)
  setSelectedOption('111')
  //setOtp(Array(9).fill(''));
  setOtp('');
}*/

const authenticate = () => {
  
  console.log('otp', otp)
  console.log('codeeeee',selectedOption + otp)
  const codeNumber = parseInt(selectedOption + otp)
  //validateUser(codeNumber);
  router.push(`/clients/${codeNumber}`)
  setLoading(false)
  setSelectedOption('111')
  setOtp('');
}
const newClient = () => {
  setSelectedOption('111')
  setOtp('');
  //setOtp(Array(9).fill(''));
}
  /*const handleChange = (enteredOtp: string) => {
    const newOtp = [...otp];
    for (let i = newOtp.length - 1; i >= 1; i--) {
      newOtp[i] = newOtp[i - 1];
    }
    newOtp[0] = enteredOtp.charAt(enteredOtp.length - 1) || '';
    console.log('mew:', newOtp)
    setOtp(newOtp);
    //const code = parseInt(enteredOtp);
    //validateUser(code);
  };*/
  const handleChange = (enteredOtp: string) => {

    console.log('mew:', enteredOtp)
    setOtp(enteredOtp);
    //const code = parseInt(enteredOtp);
    //validateUser(code);
  };

  const containerStyle = {
    direction: "rtl", // Invertir la dirección de los elementos (derecha a izquierda)
  };

  return (
    <div className={`text-center ${error ? `text-red-600` : ``} w-full h-1/3 `}>
      {(!loading) ? (
        <div
        //style={{direction: "rtl"}}
          className={`rounded-2xl flex items-center px-20 justify-center border-4 h-full ${
            error ? `border-red-600` : `border-gray-600`
          } flex-col`}
        >

          <Select className="scroll-smooth md:scroll-auto" variant="standard" value={selectedOption} onChange={(e)=>{handleChangeSelect(e as string)}} style={{
    maxHeight: '50px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 transparent', // Cambia el color de la scrollbar según tus preferencias
  }}>
 
            <Option   value="112">REPRESENTACIONES TIGRE</Option>
            <Option   value="113">FERRARO</Option>
            <Option   value='111'>FEMSA</Option>
            <Option   value="114">GULY</Option>
            <Option   value="115">NORIA</Option>
            <Option  value="116">RUTA5</Option>
            <Option  value="117">SALEMA</Option>
            <Option  value="118">REBESA</Option>
            <Option  value="119">YAMANIL</Option>
            
          </Select>
          
          <OtpInput
            //value={isAuthenticated ? userAuth[0].password : (password as any)}
           // value={otp.join('')}
            value={otp}
            onChange={handleChange}
            numInputs={9}
            separator={<span> - </span>}
            isInputNum
            inputStyle={{
              width: "6vw",
              height: "50px",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: `1px solid ${theme === "dark" ? "white" : "black"}`,
            }}
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
          />
         
         <Button className="p-3 mt-5 mb-2" color="green" onClick={()=> {setLoading(true);authenticate();}}>Obtener Cliente</Button>
        </div>
       ) : (<div> `Cargando datos...` </div>) }
      
     
      
    </div>
  );
}
