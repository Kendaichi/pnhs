import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, GraduationCap, UserCog,
  Megaphone, FileText, CalendarDays, LogOut, School, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserRole } from '@/types';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuByRole: Record<UserRole, MenuItem[]> = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Students', url: '/students', icon: GraduationCap },
    { title: 'Sections', url: '/sections', icon: BookOpen },
    { title: 'Staff', url: '/staff', icon: UserCog },
    { title: 'Subjects', url: '/subjects', icon: ClipboardList },
    { title: 'Grades', url: '/grades', icon: FileText },
    { title: 'Attendance', url: '/attendance', icon: CalendarDays },
    { title: 'Announcements', url: '/announcements', icon: Megaphone },
  ],
  teacher: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Classes', url: '/my-classes', icon: BookOpen },
    { title: 'Grade Encoding', url: '/grade-encoding', icon: FileText },
    { title: 'Attendance', url: '/attendance', icon: CalendarDays },
    { title: 'Announcements', url: '/announcements', icon: Megaphone },
  ],
  registrar: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Students', url: '/students', icon: GraduationCap },
    { title: 'Enrollment', url: '/enrollment', icon: Users },
    { title: 'Sections', url: '/sections', icon: BookOpen },
    { title: 'Reports', url: '/reports', icon: FileText },
    { title: 'Announcements', url: '/announcements', icon: Megaphone },
  ],
  parent: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Grades', url: '/my-grades', icon: FileText },
    { title: 'Attendance', url: '/my-attendance', icon: CalendarDays },
    { title: 'Schedule', url: '/my-schedule', icon: CalendarDays },
    { title: 'Announcements', url: '/announcements', icon: Megaphone },
  ],
  student: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Grades', url: '/student-grades', icon: FileText },
    { title: 'My Attendance', url: '/student-attendance', icon: CalendarDays },
    { title: 'My Schedule', url: '/student-schedule', icon: CalendarDays },
    { title: 'Announcements', url: '/announcements', icon: Megaphone },
  ],
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  if (!user) return null;
  const items = menuByRole[user.role] || [];

  return (
    <Sidebar collapsible="icon" className="gradient-sidebar border-r-0">
      <div className="p-4 flex items-center gap-3 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sidebar-primary/90 flex-shrink-0 shadow-lg shadow-sidebar-primary/20">
          <School className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-heading font-bold text-sidebar-foreground tracking-tight truncate">RNHS</p>
            <p className="text-[11px] text-sidebar-foreground/50 capitalize">{user.role} Portal</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 uppercase tracking-wider text-[10px] font-semibold">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-all" activeClassName="bg-sidebar-primary/15 text-sidebar-primary font-semibold">
                      <item.icon className="mr-2.5 h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      {!collapsed && <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white shadow-md">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/40">@{user.username}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg">
          <LogOut className="w-4 h-4 mr-2" />
          {!collapsed && 'Sign Out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
