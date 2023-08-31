"use client";
import { createContext, useState, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User } from "../models/User";
import { useLocalStorage } from "../hooks";
import { getUserByPassword } from "../services/getUserByPassword";
interface AuthContextProps {
  userAuth: User[];
  password: number;
  error: string;
  isAuthenticated: boolean;
  validateUser: (code: number) => void;
  validateUserLogin: () => void;
  loadAuthUser: boolean;
  logout: () => void;
  setUserAuth: (user: User[]) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const [userAuth, setUserAuth] = useLocalStorage<User[]>("userAuth", []);
  const [password, setPassword] = useState<number>(0o0);
  const [error, setError] = useState<string>("");
  const [loadAuthUser, setLoadAuthUser] = useState(false);

  const isAuthenticated = !!userAuth.length;
  const logout = () => {
    router.push("/login");
    setTimeout(() => {
      setUserAuth([]);
      setPassword(0o0);
    }, 100);
  };

  const validateUser = async (code: number) => {
    try {
      setLoadAuthUser(true);
      setError("");
      setPassword(code);

      const user = await getUserByPassword('blive');

      if (Object.keys(user).length) {
        const { password, ...userWithoutPassword } = user;
        setUserAuth([userWithoutPassword]);
        router.push("/clients");
      } else {
        if (code.toString().length === 5) {
          setError("El código ingresado no pertenece a ningún usuario");
          setUserAuth([]);
        }
      }
    } catch (error) {
      console.error("Error validating user:", error);
      setError("Error al validar el usuario");
    } finally {
      setLoadAuthUser(false);
    }
  };

  const validateUserLogin = async () => {
    try {
      setLoadAuthUser(true);
      setError("");
      const user = {
        id: '',
        password: 0,
        name: '',
        email: '',
        mobile: '',
        enabled: true,
        address: '',
        route: '',
        phone: '',
      }

        setUserAuth([user]);
      
    } catch (error) {
      console.error("Error validating user:", error);
      setError("Error al validar el usuario");
    } finally {
      setLoadAuthUser(false);
    }
  };

  const data: AuthContextProps = useMemo(() => {
    return {
      userAuth,
      password,
      error,
      validateUser,
      validateUserLogin,
      isAuthenticated,
      setUserAuth,
      logout,
      loadAuthUser,
    };
  }, [userAuth, password, error, isAuthenticated, loadAuthUser]);

  // if (!users.length) return <Loader />;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
