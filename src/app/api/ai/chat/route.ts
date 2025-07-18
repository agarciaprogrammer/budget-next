// src/app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { askAI } from '@/lib/ai/assistant';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Pregunta requerida' }, { status: 400 });
    }

    const response = await askAI(question);
    
    return NextResponse.json({ answer: response });
  } catch (error) {
    console.error('Error IA route:', error);
    return NextResponse.json({ 
      error: 'Error al procesar la pregunta',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}