// src/components/total-card.tsx
interface TotalCardProps {
    title: string;
    amount: number;
    color: 'red' | 'green' | 'blue';
    prefix?: string;
  }
  
  export function TotalCard({ title, amount, color, prefix = "$" }: TotalCardProps) {
    const colorClasses = {
      red: 'bg-red-900/20 border-red-800 text-red-400',
      green: 'bg-green-900/20 border-green-800 text-green-400',
      blue: 'bg-blue-900/20 border-blue-800 text-blue-400'
    };
  
    return (
      <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
        <h3 className="text-sm font-medium mb-2 opacity-80">{title}</h3>
        <p className="text-2xl font-bold">{prefix}{Math.abs(amount).toFixed(2)}</p>
      </div>
    );
  }