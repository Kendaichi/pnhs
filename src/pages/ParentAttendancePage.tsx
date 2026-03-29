import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudentsByGuardian, getEnrollmentByStudent, attendanceRecords } from '@/data/mock-data';
import type { AttendanceStatus } from '@/types';

const statusColor: Record<AttendanceStatus, string> = {
  Present: 'bg-success',
  Absent: 'bg-destructive',
  Late: 'bg-warning',
  Excused: 'bg-info',
};

export default function ParentAttendancePage() {
  const { user } = useAuth();
  const myStudents = getStudentsByGuardian(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground text-sm">Monthly attendance overview</p>
      </div>

      <div className="flex gap-4 text-xs">
        {(['Present', 'Absent', 'Late', 'Excused'] as AttendanceStatus[]).map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${statusColor[s]}`} />
            <span className="text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>

      {myStudents.map(student => {
        const enrollment = getEnrollmentByStudent(student.id);
        if (!enrollment) return null;
        const records = attendanceRecords.filter(a => a.enrollmentId === enrollment.id);

        const summary = {
          Present: records.filter(r => r.status === 'Present').length,
          Absent: records.filter(r => r.status === 'Absent').length,
          Late: records.filter(r => r.status === 'Late').length,
          Excused: records.filter(r => r.status === 'Excused').length,
        };

        return (
          <Card key={student.id} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{student.firstName} {student.lastName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {(Object.entries(summary) as [AttendanceStatus, number][]).map(([status, count]) => (
                  <div key={status} className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground">{status}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {records.map(r => (
                  <div key={r.id} className={`w-6 h-6 rounded-md ${statusColor[r.status]} flex items-center justify-center`} title={`${r.date} — ${r.status}`}>
                    <span className="text-[9px] font-bold text-primary-foreground">{new Date(r.date).getDate()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
