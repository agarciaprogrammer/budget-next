// src/app/api/incomes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Income, User } from '@/lib/db/models';

// GET - Listar todos los incomes
export async function GET() {
  try {
    const incomes = await Income.findAll();
    return NextResponse.json(incomes);
  } catch {
    return NextResponse.json({ error: 'Error fetching incomes' }, { status: 500 });
  }
}

// POST - Crear nuevo income
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

    const income = await Income.create({
      amount: body.amount,
      description: body.description,
      source: body.source,
      date: body.date || new Date(),
      userId: user.id,
    });
    
    return NextResponse.json(income, { status: 201 });
  } catch (error) {
    console.error('Error creating income:', error);
    return NextResponse.json({ 
      error: 'Error creating income',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}