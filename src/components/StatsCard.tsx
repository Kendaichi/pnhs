import { Card, CardContent } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-200 border-0 group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {icon}
          </div>
        </div>
        <div className="text-2xl font-heading font-bold text-foreground tracking-tight">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1.5">{description}</p>}
      </CardContent>
    </Card>
  );
}
