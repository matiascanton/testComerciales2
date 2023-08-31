"use client";

import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks";

type Theme = "dark" | "light";

interface ThemeContextData {
  theme: Theme;
  handleTheme: (e: React.SyntheticEvent, checked: boolean) => void;
  check: boolean;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);
const initialTheme: Theme = "light";

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", initialTheme);
  const [check, setCheck] = useLocalStorage<boolean>("check", false);

  const handleTheme = (e: React.SyntheticEvent, checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setCheck(checked);
  };

  const data: ThemeContextData = useMemo(() => {
    return { theme, handleTheme, check };
  }, [theme, check]);

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};
const useTheme = (): ThemeContextData => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return themeContext;
};

export { ThemeProvider, useTheme };
export default ThemeContext;
