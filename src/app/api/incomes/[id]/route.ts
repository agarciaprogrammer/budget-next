// src/app/api/incomes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Income } from '@/lib/db/models';

// GET - Obtener income específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const income = await Income.findByPk(id);
    if (!income) {
      return NextResponse.json({ error: 'Income not found' }, { status: 404 });
    }
    return NextResponse.json(income);
  } catch {
    return NextResponse.json({ error: 'Error fetching income' }, { status: 500 });
  }
}

// DELETE - Eliminar income
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await Income.destroy({ where: { id } });
    
    if (!deleted) {
      return NextResponse.json({ error: 'Income not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Income deleted' });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error deleting income',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
