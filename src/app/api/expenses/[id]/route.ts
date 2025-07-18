// src/app/api/expenses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Expense } from '@/lib/db/models';

// GET - Obtener expense específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json(expense);
  } catch {
    return NextResponse.json({ error: 'Error fetching expense' }, { status: 500 });
  }
}

// DELETE - Eliminar expense
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await Expense.destroy({ where: { id } });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Expense deleted' });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error deleting expense',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
