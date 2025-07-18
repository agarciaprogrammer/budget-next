// src/app/incomes/income-table.tsx
import { Income } from '@/lib/db/models';
import DeleteIncome from './delete-income';

export default async function IncomeTable() {
  const incomes = await Income.findAll({
    order: [['date', 'DESC']],
  });

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Fuente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {incomes.map((income) => (
            <tr key={income.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 text-sm text-gray-300">{new Date(income.date).toLocaleDateString('es-ES')}</td>
              <td className="px-6 py-4 text-sm text-gray-300">{income.description}</td>
              <td className="px-6 py-4 text-sm">
                <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200">{income.source}</span>
              </td>
              <td className="px-6 py-4 text-sm text-white">${Number(income.amount).toFixed(2)}</td>
              <td className="px-6 py-4 text-sm">
                <DeleteIncome id={income.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}