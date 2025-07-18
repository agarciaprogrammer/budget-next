# Budget Tracker

Una aplicación de seguimiento de finanzas personales construida con Next.js, TypeScript y PostgreSQL.

## Características

- 📊 Dashboard con gráficos interactivos
- 💰 Gestión de ingresos y gastos
- 🤖 Asistente IA para análisis financiero
- 📱 Diseño responsive
- 🎨 Interfaz moderna con tema oscuro

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```bash
# Base de datos PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/budget_tracker

# Google AI (para el asistente)
GOOGLE_API_KEY=your_google_api_key_here
```

### Instalación

```bash
npm install
npm run dev
```

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel:
   - `DATABASE_URL`: URL de tu base de datos PostgreSQL
   - `GOOGLE_API_KEY`: Tu clave de API de Google AI

## Tecnologías

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: PostgreSQL con Sequelize
- **IA**: Google Generative AI
- **Gráficos**: Chart.js
