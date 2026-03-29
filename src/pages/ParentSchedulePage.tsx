import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStudentsByGuardian, getEnrollmentByStudent, getSectionById, teachingLoads, getSubjectById, getStaffById } from '@/data/mock-data';
import { CalendarDays, Clock } from 'lucide-react';

export default function ParentSchedulePage() {
  const { user } = useAuth();
  const myStudents = getStudentsByGuardian(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Class Schedule</h1>
        <p className="text-muted-foreground text-sm">Your child's daily schedule</p>
      </div>

      {myStudents.map(student => {
        const enrollment = getEnrollmentByStudent(student.id);
        if (!enrollment) return null;
        const section = getSectionById(enrollment.sectionId);
        const loads = teachingLoads.filter(tl => tl.sectionId === enrollment.sectionId);

        return (
          <Card key={student.id} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {student.firstName} {student.lastName}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  Grade {section?.gradeLevel} — {section?.name}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loads.map(load => {
                  const subject = getSubjectById(load.subjectId);
                  const teacher = getStaffById(load.staffId);
                  return (
                    <div key={load.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CalendarDays className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{subject?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {teacher ? `${teacher.firstName} ${teacher.lastName}` : '—'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{load.schedule || 'TBA'}</span>
                      </div>
                    </div>
                  );
                })}
                {loads.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">No schedule data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
