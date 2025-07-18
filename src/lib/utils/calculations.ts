// src/lib/utils/calculations.ts
import { Expense, Income } from '@/lib/db/models';

export async function getFinancialSummary() {
  const [expenses, incomes] = await Promise.all([
    Expense.findAll(),
    Income.findAll()
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const totalIncomes = incomes.reduce((sum, inc) => sum + Number(inc.amount), 0);
  const balance = totalIncomes - totalExpenses;

  return { totalExpenses, totalIncomes, balance };
}

// Actualizar budget para usar totalIncomes
export function getBudgetSummary(totalIncomes: number, totalExpenses: number) {
  const budget = totalIncomes; // <- Ahora es dinámico
  const remaining = budget - totalExpenses;
  const percentageUsed = totalExpenses > 0 ? (totalExpenses / budget) * 100 : 0;

  return { budget, remaining, percentageUsed };
}