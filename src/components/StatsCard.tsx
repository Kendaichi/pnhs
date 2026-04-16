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
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 group cursor-default overflow-hidden relative">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <p className="text-[13px] font-medium text-muted-foreground leading-tight">{title}</p>
          <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <div className="text-[28px] font-heading font-extrabold text-foreground tracking-tight leading-none">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{description}</p>}
      </CardContent>
    </Card>
  );
}