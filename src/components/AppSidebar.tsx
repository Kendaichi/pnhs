import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, GraduationCap, UserCog,
  Megaphone, FileText, CalendarDays, LogOut, School,
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
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-primary flex-shrink-0">
          <School className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-heading font-bold text-sidebar-foreground truncate">RNHS</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role}</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
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
          <div className="flex items-center gap-2 px-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-accent-foreground">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50">@{user.username}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="w-4 h-4 mr-2" />
          {!collapsed && 'Sign Out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
