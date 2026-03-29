import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { attendanceRecords, enrollments, students, sections, getTeachingLoadsByStaff, getSectionById, getSubjectById } from '@/data/mock-data';
import type { AttendanceStatus } from '@/types';
import { CalendarDays } from 'lucide-react';

const statusColors: Record<AttendanceStatus, string> = {
  Present: 'default',
  Absent: 'destructive',
  Late: 'secondary',
  Excused: 'outline',
};

export default function AttendancePage() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const loads = isTeacher ? getTeachingLoadsByStaff(user!.refId) : [];
  const [selectedSection, setSelectedSection] = useState(loads[0]?.sectionId || sections[0]?.id || '');

  const records = useMemo(() => {
    const sectionEnrollments = enrollments.filter(e => e.sectionId === selectedSection);
    return sectionEnrollments.map(enrollment => {
      const student = students.find(s => s.id === enrollment.studentId)!;
      const attendance = attendanceRecords.filter(a => a.enrollmentId === enrollment.id);
      return { student, attendance };
    });
  }, [selectedSection]);

  const dates = [...new Set(attendanceRecords.map(a => a.date))].sort();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground text-sm">Track daily attendance per subject</p>
        </div>
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            {(isTeacher ? loads.map(l => getSectionById(l.sectionId)!) : sections).filter(Boolean).map(s => (
              <SelectItem key={s.id} value={s.id}>Grade {s.gradeLevel} - {s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-card z-10">Student</TableHead>
                  {dates.map(d => (
                    <TableHead key={d} className="text-center text-xs whitespace-nowrap">
                      {new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map(({ student, attendance }) => (
                  <TableRow key={student.id}>
                    <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm whitespace-nowrap">
                      {student.lastName}, {student.firstName}
                    </TableCell>
                    {dates.map(d => {
                      const record = attendance.find(a => a.date === d);
                      return (
                        <TableCell key={d} className="text-center">
                          {record ? (
                            <Badge variant={statusColors[record.status] as any} className="text-[10px] px-1.5">
                              {record.status.charAt(0)}
                            </Badge>
                          ) : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
