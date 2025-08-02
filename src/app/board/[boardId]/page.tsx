
'use client';

import { useParams } from 'next/navigation';

export default function BoardPage() {
  const params = useParams();
  const { boardId } = params;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold">Tablero</h1>
      <p className="mt-4 text-lg">
        Mostrando contenido para el tablero con ID: <span className="font-mono text-primary">{boardId}</span>
      </p>
    </div>
  );
}
