import { Button } from "@/components/ui/button";

const mainButtons = [
  { label: "Gestión de proyectos" },
  { label: "Tableros" },
  { label: "Línea de tiempo" },
  { label: "CartoDEA" },
];

export default function Home() {
  return (
    <main className="flex-grow container mx-auto p-4 sm:p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
        {mainButtons.map((button) => (
          <Button
            key={button.label}
            className="h-40 md:h-48 text-2xl font-bold rounded-lg shadow-xl transition-all bg-neutral-400/80 hover:bg-neutral-400 text-foreground focus:ring-accent"
            aria-label={button.label}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </main>
  );
}