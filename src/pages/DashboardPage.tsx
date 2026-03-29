import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { students, enrollments, staff, sections, announcements, gradeRecords, getStudentsByGuardian, getEnrollmentByStudent, getSectionById, getSubjectById, getGradesByEnrollment, getTeachingLoadsByStaff } from '@/data/mock-data';
import { computeQuarterlyGrade } from '@/lib/grading';
import { GraduationCap, Users, BookOpen, FileText, Megaphone, CalendarDays } from 'lucide-react';
import type { UserRole } from '@/types';

function AdminDashboard() {
  const activeEnrollments = enrollments.filter(e => e.status === 'Active').length;
  const totalSections = sections.length;
  const totalStaff = staff.length;
  const totalGrades = gradeRecords.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your school.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Enrolled Students" value={activeEnrollments} icon={<GraduationCap className="w-5 h-5" />} description="Active this school year" />
        <StatsCard title="Sections" value={totalSections} icon={<BookOpen className="w-5 h-5" />} description="JHS & SHS" />
        <StatsCard title="Staff" value={totalStaff} icon={<Users className="w-5 h-5" />} description="Teaching & non-teaching" />
        <StatsCard title="Grades Submitted" value={totalGrades} icon={<FileText className="w-5 h-5" />} description="Q1 & Q2 records" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Enrollment by Section</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections.map(sec => {
                const count = enrollments.filter(e => e.sectionId === sec.id && e.status === 'Active').length;
                return (
                  <div key={sec.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm text-foreground">{sec.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">Grade {sec.gradeLevel}{sec.strand ? ` - ${sec.strand}` : ''}</span>
                    </div>
                    <Badge variant="secondary">{count} students</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Recent Announcements</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="border-l-2 border-primary pl-3 py-1">
                  <p className="text-sm font-medium text-foreground">{ann.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(ann.createdAt).toLocaleDateString()}</p>
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
        <h1 className="text-2xl font-heading font-bold text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}. Manage your classes and grades.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="My Classes" value={loads.length} icon={<BookOpen className="w-5 h-5" />} description="Assigned teaching loads" />
        <StatsCard title="Students" value={loads.length * 10} icon={<GraduationCap className="w-5 h-5" />} description="Across all sections" />
        <StatsCard title="Announcements" value={announcements.filter(a => a.targetRoles.includes('teacher')).length} icon={<Megaphone className="w-5 h-5" />} />
      </div>
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">My Teaching Load</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loads.map(load => {
              const subject = getSubjectById(load.subjectId);
              const section = getSectionById(load.sectionId);
              return (
                <div key={load.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-foreground">{subject?.name}</p>
                    <p className="text-xs text-muted-foreground">{section?.name} — Grade {section?.gradeLevel}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{load.schedule}</span>
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
        <h1 className="text-2xl font-heading font-bold text-foreground">Registrar Dashboard</h1>
        <p className="text-muted-foreground">Manage enrollment, records, and reports.</p>
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
        <h1 className="text-2xl font-heading font-bold text-foreground">Parent Portal</h1>
        <p className="text-muted-foreground">View your child's academic progress.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myStudents.map(stu => {
          const enrollment = getEnrollmentByStudent(stu.id);
          const section = enrollment ? getSectionById(enrollment.sectionId) : undefined;
          return (
            <Card key={stu.id} className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{stu.firstName} {stu.lastName}</p>
                    <p className="text-xs text-muted-foreground">
                      {section ? `Grade ${section.gradeLevel} — ${section.name}` : 'Not enrolled'}
                      {section?.strand && ` (${section.strand})`}
                    </p>
                    <p className="text-xs text-muted-foreground">LRN: {stu.lrn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Announcements</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.filter(a => a.targetRoles.includes('parent')).map(ann => (
              <div key={ann.id} className="border-l-2 border-primary pl-3 py-2">
                <p className="text-sm font-medium text-foreground">{ann.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ann.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(ann.createdAt).toLocaleDateString()}</p>
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
};

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;
  const Dashboard = dashboardByRole[user.role];
  return <Dashboard />;
}
