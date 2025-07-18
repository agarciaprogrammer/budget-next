// src/app/incomes/delete-income.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function DeleteIncome({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Eliminar este ingreso?')) return;
    await fetch(`/api/incomes/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return <button onClick={handleDelete} className="text-red-400 hover:text-red-300 text-sm">Eliminar</button>;
}