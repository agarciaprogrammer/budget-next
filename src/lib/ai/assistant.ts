// src/lib/ai/assistant.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Expense, Income } from "@/lib/db/models";
import "@/lib/db/index"; // Importar para inicializar la conexión

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askAI(question: string) {
  try {
    // Verificar si la base de datos está disponible
    if (!process.env.DATABASE_URL) {
      return 'La base de datos no está configurada. Por favor, configura las variables de entorno.';
    }

    // Obtener datos reales
    const [expenses, incomes] = await Promise.all([
      Expense.findAll({ order: [['date', 'DESC']], limit: 20 }),
      Income.findAll({ order: [['date', 'DESC']], limit: 20 })
    ]);

    // Formatear datos para el prompt
    const expenseData = expenses.map(e => ({
      description: e.description,
      amount: Number(e.amount),
      category: e.category,
      date: e.date.toISOString().split('T')[0]
    }));

    const incomeData = incomes.map(i => ({
      description: i.description,
      amount: Number(i.amount),
      source: i.source,
      date: i.date.toISOString().split('T')[0]
    }));

    // Crear prompt contextual
    const contextualPrompt = `
Eres un asistente financiero experto. Analiza estos datos y responde en español de forma clara y breve:

DATOS ACTUALES:
- Total de gastos: $${expenseData.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
- Total de ingresos: $${incomeData.reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
- Últimos 20 gastos: ${JSON.stringify(expenseData, null, 2)}
- Últimos 20 ingresos: ${JSON.stringify(incomeData, null, 2)}

PREGUNTA DEL USUARIO: ${question}

Responde directamente con los insights más relevantes. Sé conciso y útil.
`;

    const result = await model.generateContent(contextualPrompt);
    return result.response.text();
  } catch (error) {
    console.error('Error Gemini:', error);
    return 'Lo siento, no pude analizar tus datos ahora. Intenta más tarde.';
  }
}