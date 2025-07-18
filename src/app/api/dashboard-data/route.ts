// src/app/api/dashboard-data/route.ts
import { NextResponse } from 'next/server';
import { Expense, Income } from '@/lib/db/models';

export async function GET() {
  try {
    const [expenses, incomes] = await Promise.all([
      Expense.findAll(),
      Income.findAll(),
    ]);

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalIncomes = incomes.reduce((sum, i) => sum + Number(i.amount), 0);

    const expensesByCategory = await Expense.findAll({
      attributes: ['category', [Expense.sequelize!.fn('SUM', Expense.sequelize!.col('amount')), 'total']],
      group: ['category'],
      raw: true,
    }) as unknown as { category: string; total: string }[];
    
    const incomesBySource = await Income.findAll({
      attributes: ['source', [Income.sequelize!.fn('SUM', Income.sequelize!.col('amount')), 'total']],
      group: ['source'],
      raw: true,
    }) as unknown as { source: string; total: string }[];

    return NextResponse.json({
      summary: { totalExpenses, totalIncomes, balance: totalIncomes - totalExpenses },
      expenseChart: {
        labels: expensesByCategory.map((e) => e.category),
        data: expensesByCategory.map((e) => Number(e.total)),
        backgroundColor: ['#EF4444', '#F59E0B', '#8B5CF6', '#22C55E', '#3B82F6'],
      },
      incomeChart: {
        labels: incomesBySource.map((i) => i.source),
        data: incomesBySource.map((i) => Number(i.total)),
        backgroundColor: ['#22C55E', '#3B82F6', '#8B5CF6', '#F59E0B'],
      },
    });
  } catch (err) {
    console.error('Error dashboard API:', err);
    return NextResponse.json({ error: 'Error al cargar datos' }, { status: 500 });
  }
}