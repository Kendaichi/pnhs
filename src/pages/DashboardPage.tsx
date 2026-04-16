import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { students, enrollments, staff, sections, announcements, gradeRecords, getStudentsByGuardian, getEnrollmentByStudent, getSectionById, getSubjectById, getGradesByEnrollment, getTeachingLoadsByStaff } from '@/data/mock-data';
import { computeQuarterlyGrade } from '@/lib/grading';
import { GraduationCap, Users, BookOpen, FileText, Megaphone, CalendarDays, TrendingUp, Clock } from 'lucide-react';
import type { UserRole } from '@/types';
import StudentDashboardPage from './StudentDashboardPage';

function AdminDashboard() {
  const activeEnrollments = enrollments.filter(e => e.status === 'Active').length;
  const totalSections = sections.length;
  const totalStaff = staff.length;
  const totalGrades = gradeRecords.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">Welcome back. Here's your school overview for today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border/40">
          <Clock className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Enrolled Students" value={activeEnrollments} icon={<GraduationCap className="w-5 h-5" />} description="Active this school year" />
        <StatsCard title="Sections" value={totalSections} icon={<BookOpen className="w-5 h-5" />} description="JHS & SHS" />
        <StatsCard title="Staff Members" value={totalStaff} icon={<Users className="w-5 h-5" />} description="Teaching & non-teaching" />
        <StatsCard title="Grades Submitted" value={totalGrades} icon={<FileText className="w-5 h-5" />} description="Q1 & Q2 records" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="shadow-card border border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[15px] font-bold">Enrollment by Section</CardTitle>
              <Badge variant="secondary" className="text-[10px] font-medium">{sections.length} sections</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections.map(sec => {
                const count = enrollments.filter(e => e.sectionId === sec.id && e.status === 'Active').length;
                const percent = Math.round((count / 50) * 100);
                return (
                  <div key={sec.id} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="font-semibold text-[13px] text-foreground">{sec.name}</span>
                        <span className="text-[11px] text-muted-foreground ml-2">Grade {sec.gradeLevel}{sec.strand ? ` · ${sec.strand}` : ''}</span>
                      </div>
                      <span className="text-[12px] font-semibold text-foreground">{count}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[15px] font-bold">Recent Announcements</CardTitle>
              <Badge variant="secondary" className="text-[10px] font-medium">{announcements.length} total</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.slice(0, 4).map((ann, idx) => (
                <div key={ann.id} className="flex gap-3 group">
                  <div className="w-1 rounded-full gradient-primary flex-shrink-0 self-stretch" />
                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="text-[13px] font-semibold text-foreground truncate">{ann.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{new Date(ann.createdAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const { user } = useAuth();
  const loads = getTeachingLoadsByStaff(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">Welcome, {user?.name}. Manage your classes and grades.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="My Classes" value={loads.length} icon={<BookOpen className="w-5 h-5" />} description="Assigned teaching loads" />
        <StatsCard title="Students" value={loads.length * 10} icon={<GraduationCap className="w-5 h-5" />} description="Across all sections" />
        <StatsCard title="Announcements" value={announcements.filter(a => a.targetRoles.includes('teacher')).length} icon={<Megaphone className="w-5 h-5" />} />
      </div>
      <Card className="shadow-card border border-border/50">
        <CardHeader className="pb-3"><CardTitle className="text-[15px] font-bold">My Teaching Load</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {loads.map(load => {
              const subject = getSubjectById(load.subjectId);
              const section = getSectionById(load.sectionId);
              return (
                <div key={load.id} className="flex items-center justify-between p-3.5 bg-muted/50 rounded-xl border border-border/30 hover:border-primary/20 transition-colors">
                  <div>
                    <p className="font-semibold text-[13px] text-foreground">{subject?.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{section?.name} — Grade {section?.gradeLevel}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground bg-card px-2.5 py-1 rounded-md border border-border/40 font-medium">{load.schedule}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RegistrarDashboard() {
  const activeCount = enrollments.filter(e => e.status === 'Active').length;
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Registrar Dashboard</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">Manage enrollment, records, and reports.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Active Enrollments" value={activeCount} icon={<GraduationCap className="w-5 h-5" />} />
        <StatsCard title="Total Students" value={students.length} icon={<Users className="w-5 h-5" />} />
        <StatsCard title="Sections" value={sections.length} icon={<BookOpen className="w-5 h-5" />} />
      </div>
    </div>
  );
}

function ParentDashboard() {
  const { user } = useAuth();
  const myStudents = getStudentsByGuardian(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Parent Portal</h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">View your child's academic progress.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myStudents.map(stu => {
          const enrollment = getEnrollmentByStudent(stu.id);
          const section = enrollment ? getSectionById(enrollment.sectionId) : undefined;
          return (
            <Card key={stu.id} className="shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.08] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-foreground">{stu.firstName} {stu.lastName}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {section ? `Grade ${section.gradeLevel} — ${section.name}` : 'Not enrolled'}
                      {section?.strand && ` (${section.strand})`}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">LRN: {stu.lrn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card border border-border/50">
        <CardHeader className="pb-3"><CardTitle className="text-[15px] font-bold">Announcements</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.filter(a => a.targetRoles.includes('parent')).map(ann => (
              <div key={ann.id} className="flex gap-3">
                <div className="w-1 rounded-full gradient-primary flex-shrink-0 self-stretch" />
                <div className="py-0.5">
                  <p className="text-[13px] font-semibold text-foreground">{ann.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{ann.content}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">{new Date(ann.createdAt).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const dashboardByRole: Record<UserRole, React.FC> = {
  admin: AdminDashboard,
  teacher: TeacherDashboard,
  registrar: RegistrarDashboard,
  parent: ParentDashboard,
  student: StudentDashboardPage,
};

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;
  const Dashboard = dashboardByRole[user.role];
  return <Dashboard />;
}