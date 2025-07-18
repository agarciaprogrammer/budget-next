// src/app/expenses/page.tsx
import { getFinancialSummary, getBudgetSummary } from '@/lib/utils/calculations';
import ExpenseTable from './expense-table';
import ExpenseForm from './expense-form';
import { TotalCard } from '@/components/total-card';
export const dynamic = 'force-dynamic';

export default async function ExpensesPage() {
  const { totalExpenses, totalIncomes } = await getFinancialSummary();
  const { budget, remaining, percentageUsed } = getBudgetSummary(totalIncomes, totalExpenses);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Gastos</h1>
        <p className="text-gray-400">Gestiona todos tus gastos personales</p>
      </div>

      {/* Cards de totales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <TotalCard title="Total Gastado" amount={totalExpenses} color="red" />
        <TotalCard title="Presupuesto Mensual" amount={budget} color="blue" />
        <TotalCard 
          title={remaining >= 0 ? "Restante" : "Excedido"} 
          amount={remaining} 
          color={remaining >= 0 ? "green" : "red"} 
        />
      </div>

      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Presupuesto utilizado</span>
          <span>{percentageUsed.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${percentageUsed > 100 ? 'bg-red-500' : 'bg-red-400'}`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ExpenseTable />
        </div>
        <div className="lg:col-span-1">
          <ExpenseForm />
        </div>
      </div>
    </div>
  );
}