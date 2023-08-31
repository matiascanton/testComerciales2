import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

import products1 from "@/public/assets/carrousel/815ed0d2d10a098a199f9364951c1323.jpeg";
import products2 from "@/public/assets/carrousel/compania-total-bebidas.jpg";
import products3 from "@/public/assets/carrousel/ECCBC_Products_Fanta.png";
import products4 from "@/public/assets/carrousel/1000_F_412511390_W7VsycjxtglvWboZueczR2NpekNHSP5o.jpg";
import { useRef } from "react";

export default function ImagesSlider() {
  const imageProducts = [products1, products2, products3, products4];

  return (
    <Carousel
      transition={{ duration: 1 }}
      className="rounded-xl flex items-center w-screen h-1/4 bg-white"
      autoplay
      loop
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={() => <></>}
      nextArrow={() => <></>}
    >
      {imageProducts.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="image 3"
          className="object-cover h-full"
        />
      ))}
    </Carousel>
  );
}
