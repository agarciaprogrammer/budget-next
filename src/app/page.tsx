// src/app/page.tsx
export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Budget Tracker</h1>
      <p className="text-gray-400 text-lg mb-8">
        Gestiona tus finanzas personales de forma simple y efectiva
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">💸 Gastos</h3>
          <p className="text-gray-400">Registra y categoriza tus gastos</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">💰 Ingresos</h3>
          <p className="text-gray-400">Controla todas tus fuentes de ingreso</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">📊 Dashboard</h3>
          <p className="text-gray-400">Visualiza tu balance financiero</p>
        </div>
      </div>
    </div>
  )
}