// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Budget Tracker',
  description: 'Gestiona tus finanzas personales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold text-white">Next Tracker</Link>
                </div>
                <div className="flex items-center space-x-8">
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                  <Link href="/expenses" className="text-gray-300 hover:text-white transition-colors">Gastos</Link>
                  <Link href="/incomes" className="text-gray-300 hover:text-white transition-colors">Ingresos</Link>
                  <Link href="/ai" className="text-gray-300 hover:text-white transition-colors">Asistente AI</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-center text-gray-400 text-sm">
                Budget Tracker © 2025
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}