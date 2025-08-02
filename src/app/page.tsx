import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <Image
        src="/fondo_dea.jpg"
        alt="Fondo de pantalla"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
      />
      <div className="relative z-10 flex h-full flex-col">
        <header className="bg-background/80 p-4 shadow-md">
          <h1 className="text-xl font-bold text-foreground">
            Departamento de Estudios Ambientales y Sociales
          </h1>
        </header>
        <main className="flex-grow"></main>
        <footer className="bg-background/80 p-4 text-center text-sm text-foreground">
          <p>© 2024. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
