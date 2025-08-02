import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen">
      <Image
        src="/fondo_dea.jpg"
        alt="Fondo de pantalla"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </main>
  );
}
