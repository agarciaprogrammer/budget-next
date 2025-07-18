// src/app/expenses/delete-expense.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function DeleteExpense({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este gasto?')) return;

    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-300 text-sm"
    >
      Eliminar
    </button>
  );
}