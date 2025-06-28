'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a la App de Productos</h1>
      <p className="mb-6 text-gray-600">Gestiona tus productos fácilmente.</p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.push('/productos')}
      >
        Ver productos
      </button>
    </main>
  );
}
