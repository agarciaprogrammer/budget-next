// src/components/ai-chat.tsx
'use client';

import { useState } from 'react';

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch {
      setAnswer('Error al conectar con el asistente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">💬 Asistente IA</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pregunta sobre tus finanzas (ej: ¿En qué gasto más?)"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100"
          rows={3}
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Pensando...' : 'Preguntar'}
        </button>
      </form>

      {answer && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h4 className="font-semibold mb-2">Respuesta:</h4>
          <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}