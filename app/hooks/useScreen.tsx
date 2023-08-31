import { useEffect, useState } from "react";

export default function useScreen() {
  const [mobileScreen, setMobileScreen] = useState<boolean>(false);
  const [loaderScreen, setLoaderScreen] = useState<boolean>(true);
  const [width, setWidth] = useState(0);

  const handleResize = () => {
    if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 800;
    console.log('window', window)
    setMobileScreen(isMobile);
    setLoaderScreen(false);
    
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { mobileScreen, loaderScreen, width };
}
