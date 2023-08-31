"use client";
import { useFetchClients } from "@/app/hooks";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Unmissables, Promotions, Exchange, Missiones } from "./components";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useAuth } from "@/app/context/authClientContext";
import { Loader } from "@/app/components";
import { useTheme } from "@/app/context/themeContext";

export default function ClientDetail() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { id } = useParams();
  const { client } = useFetchClients(parseInt(id));

  //const { missions, unmissables, loading } = useFetchProducts();
  const { missions, unmissables, loading, exchanges} = useFetchProducts(parseInt(id));

  const values = {
    id: client?.id,
    cliente: client?.business_name,
    canal: `${client?.channel_group} ${client?.gec}`,
    direccion: client?.address,
  };
  console.log('client', client)

  const [buttonActionType, setButtonActionType] = useState<string>("misiones");
  const [buttonAction, setButtonAction] = useState<string>("resumen");
  const [buttonActionTypeReco, setButtonActionTypeReco] = useState<string>("promociones");

  
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setButtonAction(newAlignment);
  };

  const handleChangeType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setButtonActionType(newAlignment);
  };

  const handleChangeTypeReco = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setButtonActionTypeReco(newAlignment);
  };
 
  const { theme } = useTheme();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  if (!client || loading) return <Loader />;

  return(
    <div className="flex flex-col items-center justify-start w-screen px-2 gap-2 overflow-hidden">
      <div className={`rounded-xl flex flex-col items-start justify-center p-2 border-2 
        ${theme === "dark"
            ? "bg-gray-900 border-gray-200/50"
            : " border-gray-600/50"
        }  w-full relative overflow-hidden`}
      >
        <div>
          {Object.entries(values).map(([key, value], i) => (
            <Typography
              key={i}
              variant="subtitle2"
              display="block"
              gutterBottom
              className={`${
                theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
            >
              <p className="">
                <span className="font-bold">{key.toUpperCase()}</span>: {value}
              </p>
            </Typography>
          ))}
        </div>
        <div className="absolute top-0 right-0 p-2">
          <Link href="/login">
            <CloseIcon className="text-red-600 font-bold" />
          </Link>
        </div>
      </div>

      <div style={{width: '100%'}}
        className={` ${theme === "dark" && "bg-gray-900"} `}
      >
        
        <ToggleButtonGroup
          color="error"
          value={buttonAction}
          exclusive
          size="small"
          onChange={handleChange}
          aria-label="Dynamics"
          sx={{ width: "100%"}}
        >
          <ToggleButton
          style={{ flex: "1", width: "50%", margin:'10px', border: '2px solid', borderRadius: "10px"}}
            disabled={buttonAction === "resumen"}
            color="error"
            value="resumen"
          >
            <span
              className={
                buttonAction !== "resumen" ? "text-gray-500" : "text-red-700 font-extrabold"
              }
            >
              Objetivos
            </span>
          </ToggleButton>
          <ToggleButton
          style={{ flex: "1", width: "50%", padding:"0px !important", margin:'10px', border: '2px solid' , borderRadius: "10px"}}
            disabled={buttonAction === "dynamics" ? true : false}
            color="error"
            value="dynamics"
          >
            <span
              className={
                buttonAction !== "dynamics" ? "text-gray-500" : "text-red-700 font-extrabold"
              }
            >
              Reconocimiento
            </span>
          </ToggleButton>
          
        </ToggleButtonGroup>
        
        <div
          className={`${theme === "dark" && "text-white"} overflow-y-scroll m-3`}
        >
          {buttonAction === "resumen" ? (
            <div>

              <ToggleButtonGroup
               size="small"
                value={buttonActionType}
                exclusive
                onChange={handleChangeType}
                aria-label="Misiones"
                style={{ width: "100%"}}
              >
                <ToggleButton
                style={{ flex: "1", width: "50%", borderBottom: 'transparent', borderRadius: '15px 15px 0px 0px' }}
                  disabled={buttonActionType === "misiones" ? true : false}
                  
                  value="misiones"
                >
                  <span
                    className={
                      buttonActionType !== "misiones" ? "text-gray-500" : "text-black-500 font-bold"
                    }
                  >
                    MISIONES
                  </span>
                </ToggleButton>
                <ToggleButton
                style={{ flex: "1", width: "50%", borderBottom: 'transparent', borderRadius: '15px 15px 0px 0px'}}
                  disabled={buttonActionType === "imperdibles"}
                  
                  value="imperdibles"
                >
                  <span
                    className={
                      buttonActionType !== "imperdibles" ? "text-gray-500" : "text-black-500 font-bold"
                    }
                  >
                    IMPERDIBLES
                  </span>
                </ToggleButton>
              </ToggleButtonGroup>

        
              {buttonActionType === "misiones" ? (
                   <div className="flex flex-col gap-4">
                    <Missiones theme={theme} missions={missions} />
                  </div>
              ) : (
                <div className="flex flex-col gap-4">
                    <Unmissables theme={theme} unmissables={unmissables} /> 
                </div>
              )}
            
            </div>
          ) : (

            <div>

              <ToggleButtonGroup
                
                value={buttonActionTypeReco}
                exclusive
                size="small"
                onChange={handleChangeTypeReco}
                aria-label="Promos"
                style={{ width: "100%"}}
              >
                <ToggleButton
                style={{ flex: "1", width: "50%", borderBottom: 'transparent' , borderRadius: '15px 15px 0px 0px'}}
                  disabled={buttonActionTypeReco === "promociones" ? true : false}
                  
                  value="promociones"
                >
                  <span
                    className={
                      buttonActionTypeReco !== "promociones" ? "text-gray-500" : "text-black-500 font-bold"
                    }
                  >
                    PROMOCIONES
                  </span>
                </ToggleButton>
                <ToggleButton
                style={{ flex: "1", width: "50%", borderBottom: 'transparent', borderRadius: '15px 15px 0px 0px'}}
                  disabled={buttonActionTypeReco === "canjes"}
                  
                  value="canjes"
                >
                  <span
                    className={
                      buttonActionTypeReco !== "canjes" ? "text-gray-500" : "text-black-500 font-bold"
                    }
                  >
                    CANJES
                  </span>
                </ToggleButton>
              </ToggleButtonGroup>

        
              {buttonActionTypeReco === "promociones" ? (
                   <div className="flex flex-col gap-4"  style={{backgroundColor: 'rgba(0, 0, 0, 0.08)' }}>
                    <Promotions theme={theme} />
                  </div>
              ) : (
                <div className="flex flex-col gap-4"  style={{backgroundColor: 'rgba(0, 0, 0, 0.08)' }}>
                    <Exchange theme={theme} exchanges={exchanges} />
                </div>
              )}

               {/*<div className="flex flex-col gap-4">
              <Promotions theme={theme} />
              <hr style={{ height: '7px', background: 'red',  border: 'none'  }} />
              <Exchange theme={theme} exchanges={exchanges} />
              </div>*/}
            
            </div>

           
          )}
        </div>
      </div>
    </div>
  );
}
