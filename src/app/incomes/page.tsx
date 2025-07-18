// src/app/incomes/page.tsx
import { getFinancialSummary } from '@/lib/utils/calculations';
import IncomeTable from './income-table';
import IncomeForm from './income-form';
import { TotalCard } from '@/components/total-card';
export const dynamic = 'force-dynamic';

export default async function IncomesPage() {
  const { totalIncomes } = await getFinancialSummary();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Ingresos</h1>
        <p className="text-gray-400">Gestiona todas tus fuentes de ingreso</p>
      </div>

      {/* Card de total */}
      <div className="mb-8">
        <TotalCard title="Total Ingresado" amount={totalIncomes} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <IncomeTable />
        </div>
        <div className="lg:col-span-1">
          <IncomeForm />
        </div>
      </div>
    </div>
  );
}