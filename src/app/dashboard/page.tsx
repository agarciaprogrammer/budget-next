// src/app/dashboard/page.tsx
'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { TotalCard } from '@/components/total-card';
import {
  Bar,
  Doughnut,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Summary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
}

interface ChartData {
  labels: string[];
  data: number[];
  backgroundColor: string[];
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [expenseChart, setExpenseChart] = useState<ChartData | null>(null);
  const [incomeChart, setIncomeChart] = useState<ChartData | null>(null);

  useEffect(() => {
    // Server Action para traer datos
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard-data');
        const json = await res.json();
        setSummary(json.summary);
        setExpenseChart(json.expenseChart);
        setIncomeChart(json.incomeChart);
      } catch (err) {
        console.error('Error cargando dashboard:', err);
      }
    }
    fetchData();
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Cargando datos...</p>
      </div>
    );
  }

  const balanceChartData = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{
      data: [summary.totalIncomes, summary.totalExpenses],
      backgroundColor: ['rgba(34,197,94,0.8)', 'rgba(239,68,68,0.8)'],
      borderColor: '#374151',
      borderWidth: 1,
    }],
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Resumen de tus finanzas</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TotalCard title="Total Ingresos" amount={summary.totalIncomes} color="green" />
        <TotalCard title="Total Gastos" amount={summary.totalExpenses} color="red" />
        <TotalCard
          title="Balance Neto"
          amount={summary.balance}
          color={summary.balance >= 0 ? 'green' : 'red'}
          prefix={summary.balance >= 0 ? '+' : '-'}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {expenseChart && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Gastos por Categoría</h3>
            <Bar
              data={{
                labels: expenseChart.labels,
                datasets: [{
                  label: 'Gastos',
                  data: expenseChart.data,
                  backgroundColor: expenseChart.backgroundColor,
                }],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { color: '#374151' } }, x: { grid: { display: false } } },
              }}
            />
          </div>
        )}

        {incomeChart && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Distribución de Ingresos</h3>
            <Doughnut
              data={{
                labels: incomeChart.labels,
                datasets: [{
                  data: incomeChart.data,
                  backgroundColor: incomeChart.backgroundColor,
                }],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Balance General</h3>
          <Doughnut
            data={balanceChartData}
            options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
      </div>
    </div>
  );
}