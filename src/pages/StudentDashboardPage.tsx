import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  students, enrollments, sections, gradeRecords, attendanceRecords,
  announcements, getEnrollmentByStudent, getSectionById, getSubjectById,
  getGradesByEnrollment, subjects,
} from '@/data/mock-data';
import { computeQuarterlyGrade } from '@/lib/grading';
import { GraduationCap, TrendingUp, CalendarDays, Megaphone, Award } from 'lucide-react';
import type { Quarter } from '@/types';

function getHonorStatus(avg: number): { label: string; color: string } | null {
  if (avg >= 98) return { label: 'With Highest Honors', color: 'bg-amber-500 text-white' };
  if (avg >= 95) return { label: 'With High Honors', color: 'bg-amber-400 text-amber-950' };
  if (avg >= 90) return { label: 'With Honors', color: 'bg-amber-300 text-amber-900' };
  return null;
}

export default function StudentDashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  const student = students.find(s => s.id === user.refId);
  if (!student) return <p className="text-muted-foreground p-6">Student record not found.</p>;

  const enrollment = getEnrollmentByStudent(student.id);
  const section = enrollment ? getSectionById(enrollment.sectionId) : undefined;

  // Compute running average from available grades
  const grades = enrollment ? getGradesByEnrollment(enrollment.id) : [];
  const subjectGrades = new Map<string, number[]>();
  grades.forEach(g => {
    const sub = getSubjectById(g.subjectId);
    if (!sub) return;
    const result = computeQuarterlyGrade(g, sub.type);
    if (!subjectGrades.has(g.subjectId)) subjectGrades.set(g.subjectId, []);
    subjectGrades.get(g.subjectId)!.push(result.quarterlyGrade);
  });

  let runningAvg = 0;
  if (subjectGrades.size > 0) {
    const avgs = Array.from(subjectGrades.values()).map(qs => qs.reduce((a, b) => a + b, 0) / qs.length);
    runningAvg = Math.round((avgs.reduce((a, b) => a + b, 0) / avgs.length) * 100) / 100;
  }

  // Attendance rate this month
  const myAttendance = enrollment ? attendanceRecords.filter(a => a.enrollmentId === enrollment.id) : [];
  const totalDays = myAttendance.length || 1;
  const presentDays = myAttendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  const honor = getHonorStatus(runningAvg);

  const studentAnnouncements = announcements.filter(a => a.targetRoles.includes('student') && a.isPublished);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with honor badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Welcome, {student.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            {section ? `Grade ${section.gradeLevel} — ${section.name}` : 'Not enrolled'}
            {section?.strand && ` (${section.strand})`}
            {' · S.Y. 2025-2026'}
          </p>
        </div>
        {honor && (
          <Badge className={`${honor.color} text-sm px-4 py-1.5 flex items-center gap-1.5 shadow-md`}>
            <Award className="w-4 h-4" />
            {honor.label}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard title="Grade Level" value={section ? `Grade ${section.gradeLevel}` : '—'} icon={<GraduationCap className="w-5 h-5" />} />
        <StatsCard title="Current Quarter" value="Q2" icon={<CalendarDays className="w-5 h-5" />} />
        <StatsCard title="Running Average" value={runningAvg || '—'} icon={<TrendingUp className="w-5 h-5" />} description={runningAvg >= 75 ? 'Passing' : 'Needs improvement'} />
        <StatsCard title="Attendance Rate" value={`${attendanceRate}%`} icon={<CalendarDays className="w-5 h-5" />} description="This month" />
      </div>

      {/* Student info card */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">My Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Full Name:</span> <span className="font-medium text-foreground ml-1">{student.firstName} {student.lastName}</span></div>
            <div><span className="text-muted-foreground">LRN:</span> <span className="font-medium text-foreground ml-1">{student.lrn}</span></div>
            <div><span className="text-muted-foreground">Section:</span> <span className="font-medium text-foreground ml-1">{section?.name || '—'}</span></div>
            <div><span className="text-muted-foreground">Grade Level:</span> <span className="font-medium text-foreground ml-1">{section ? `Grade ${section.gradeLevel}` : '—'}</span></div>
            {section?.strand && <div><span className="text-muted-foreground">Strand:</span> <span className="font-medium text-foreground ml-1">{section.strand}</span></div>}
            <div><span className="text-muted-foreground">Status:</span> <Badge variant="secondary" className="ml-1">{enrollment?.status || 'N/A'}</Badge></div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Megaphone className="w-4 h-4" /> Announcements</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studentAnnouncements.length === 0 && <p className="text-sm text-muted-foreground">No announcements.</p>}
            {studentAnnouncements.map(ann => (
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
