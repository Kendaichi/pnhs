import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/StatsCard';
import { students, getEnrollmentByStudent, attendanceRecords } from '@/data/mock-data';
import { CalendarDays, CheckCircle, XCircle, Clock, ShieldCheck } from 'lucide-react';
import type { AttendanceStatus } from '@/types';

const statusColors: Record<AttendanceStatus, string> = {
  Present: 'bg-success text-success-foreground',
  Absent: 'bg-destructive text-destructive-foreground',
  Late: 'bg-warning text-warning-foreground',
  Excused: 'bg-info text-info-foreground',
};

const statusDotColors: Record<AttendanceStatus, string> = {
  Present: 'bg-success',
  Absent: 'bg-destructive',
  Late: 'bg-warning',
  Excused: 'bg-info',
};

export default function StudentAttendancePage() {
  const { user } = useAuth();
  if (!user) return null;

  const student = students.find(s => s.id === user.refId);
  if (!student) return <p className="text-muted-foreground p-6">Student not found.</p>;

  const enrollment = getEnrollmentByStudent(student.id);
  const myAttendance = enrollment ? attendanceRecords.filter(a => a.enrollmentId === enrollment.id) : [];

  const total = myAttendance.length || 1;
  const present = myAttendance.filter(a => a.status === 'Present').length;
  const absent = myAttendance.filter(a => a.status === 'Absent').length;
  const late = myAttendance.filter(a => a.status === 'Late').length;
  const excused = myAttendance.filter(a => a.status === 'Excused').length;
  const rate = Math.round(((present + late) / total) * 100);

  // Build calendar data for June 2025
  const year = 2025;
  const month = 5; // June (0-indexed)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const attendanceByDate = new Map<string, AttendanceStatus>();
  myAttendance.forEach(a => {
    attendanceByDate.set(a.date, a.status);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">My Attendance</h1>
        <p className="text-muted-foreground">Track your daily attendance record</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard title="Present" value={present} icon={<CheckCircle className="w-5 h-5" />} />
        <StatsCard title="Absent" value={absent} icon={<XCircle className="w-5 h-5" />} />
        <StatsCard title="Late" value={late} icon={<Clock className="w-5 h-5" />} />
        <StatsCard title="Attendance Rate" value={`${rate}%`} icon={<ShieldCheck className="w-5 h-5" />} />
      </div>

      {/* Calendar */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> June 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {dayNames.map(d => (
              <div key={d} className="font-semibold text-muted-foreground py-2">{d}</div>
            ))}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `2025-06-${String(day).padStart(2, '0')}`;
              const status = attendanceByDate.get(dateStr);
              const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-md text-xs font-medium transition-colors
                    ${status ? statusColors[status] : isWeekend ? 'bg-muted/50 text-muted-foreground' : 'bg-card text-foreground'}
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border">
            {(['Present', 'Absent', 'Late', 'Excused'] as AttendanceStatus[]).map(s => (
              <div key={s} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className={`w-3 h-3 rounded-sm ${statusDotColors[s]}`} />
                {s}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
