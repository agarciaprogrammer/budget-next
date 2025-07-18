// src/app/api/test/route.ts
import { NextResponse } from 'next/server';
import sequelize from '@/lib/db';

export async function GET() {
  try {
    await sequelize.authenticate();
    return NextResponse.json({ 
      message: 'Conexión exitosa a PostgreSQL',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json({ 
      error: 'Error de conexión',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}