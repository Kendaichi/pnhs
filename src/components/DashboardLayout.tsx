import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center gap-3 border-b border-border/60 bg-card/90 glass px-4 md:px-6 sticky top-0 z-10">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="flex-1" />
            <span className="text-[11px] text-muted-foreground hidden sm:inline-flex items-center gap-1.5 font-medium bg-muted/80 px-3 py-1.5 rounded-full border border-border/40">
              📅 S.Y. 2025-2026
            </span>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground h-9 w-9 rounded-xl">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-card" />
            </Button>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm">
              {user?.name.charAt(0)}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}