// src/app/incomes/income-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IncomeForm() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          description: formData.description,
          source: formData.source,
          date: new Date(formData.date),
        }),
      });

      if (response.ok) {
        setFormData({ amount: '', description: '', source: '', date: new Date().toISOString().split('T')[0] });
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sources = ['Job', 'Freelance', 'Investment', 'Gift', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">Agregar Ingreso</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
        <input type="text" required value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Monto</label>
        <input type="number" step="0.01" required value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
          placeholder="0.00" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Fuente</label>
        <select required value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100">
          <option value="">Selecciona fuente</option>
          {sources.map((src) => <option key={src} value={src}>{src}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Fecha</label>
        <input type="date" required value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Guardando...' : 'Agregar Ingreso'}
      </button>
    </form>
  );
}