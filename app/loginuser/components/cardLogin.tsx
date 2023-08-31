import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
import { auth } from "@/app/context/fbServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authClientContext";

   
  export default function CardLogin() {
    const router = useRouter();
    const [openAlert, setAlert] = useState(false);
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    validateUserLogin,
    isAuthenticated,
  } = useAuth();


    function onSubmit() {

        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            validateUserLogin();
            setAlert(false);
            router.push("/login")
          })
          .catch((error) => {
            //console.error("Error de autenticación:", error);
            setAlert(true);
          });
    }


    return (

      <Card className="w-96" style={{backgroundColor: 'rgba(0, 0, 0, 0.08)'}}>
        <CardHeader
          variant="gradient"
          color="red"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Iniciar Sesion
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input style={{backgroundColor: 'white'}}  type="email"  value={email}  onChange={(e) => setEmail(e.target.value)} label="Correo Electronico" size="lg" />
          <Input style={{backgroundColor: 'white'}}  type="password"  value={password}  onChange={(e) => setPassword(e.target.value)} label="Contraseña" size="lg" />
          {openAlert && 
            <>
            <Typography style={{color: 'red'}}> Usuario y/o Contraseña incorrecta. </Typography>
            </>}
          <div className="-ml-2.5">
            <Checkbox label="Recuerdame" style={{backgroundColor: 'white'}} />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="red" variant="gradient" fullWidth onClick={onSubmit}>
            Ingresar
          </Button>
         {/*<Typography variant="small" className="mt-6 flex justify-center">
            No tienes cuenta?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Registrate
            </Typography>
          </Typography>*/} 
        </CardFooter>
      </Card>
   
    );
  }