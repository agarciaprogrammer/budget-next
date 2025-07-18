// src/app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Expense, User } from '@/lib/db/models';

// GET - Listar todos los expenses
export async function GET() {
  try {
    const expenses = await Expense.findAll();
    return NextResponse.json(expenses);
  } catch {
    return NextResponse.json({ error: 'Error fetching expenses' }, { status: 500 });
  }
}

// POST - Crear nuevo expense
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Crear usuario temporal si no existe
    const [user] = await User.findOrCreate({
      where: { email: 'temp@user.com' },
      defaults: {
        email: 'temp@user.com',
        name: 'Usuario Temporal',
      },
    });

    const expense = await Expense.create({
      amount: body.amount,
      description: body.description,
      category: body.category,
      date: body.date || new Date(),
      userId: user.id,
    });
    
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ 
      error: 'Error creating expense',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}