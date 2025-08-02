export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <div
        style={{ backgroundImage: "url('/fondo_dea.jpg')" }}
        className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-center"
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
