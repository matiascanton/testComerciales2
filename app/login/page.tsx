"use client";
import { useEffect } from "react";
import { RenderInput, RenderQrScann, ImagesSlider } from "./components";
import { useAuth } from "@/app/context/authClientContext";
import { useParams, useRouter } from "next/navigation";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return(
    <div className="flex flex-col gap-10 items-center justify-between w-screen px-10 h-full">
      <RenderQrScann />
      <RenderInput />
      <ImagesSlider />
    </div>
  );
}
