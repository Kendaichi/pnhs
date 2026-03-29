import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { students, enrollments, sections } from '@/data/mock-data';
import { GraduationCap } from 'lucide-react';

export default function EnrollmentPage() {
  const activeEnrollments = enrollments.filter(e => e.status === 'Active');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Enrollment Management</h1>
        <p className="text-muted-foreground text-sm">{activeEnrollments.length} active enrollments for S.Y. 2025-2026</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['Active', 'Dropped', 'Retained', 'Graduated'] as const).map(status => (
          <Card key={status} className="shadow-card">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-foreground">{enrollments.filter(e => e.status === status).length}</p>
              <p className="text-xs text-muted-foreground">{status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(sec => {
          const sectionEnrollments = enrollments.filter(e => e.sectionId === sec.id);
          return (
            <Card key={sec.id} className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-sm">{sec.name} — Grade {sec.gradeLevel}</h3>
                  {sec.strand && <Badge variant="secondary" className="text-xs">{sec.strand}</Badge>}
                </div>
                <div className="space-y-1.5">
                  {sectionEnrollments.slice(0, 5).map(enrollment => {
                    const student = students.find(s => s.id === enrollment.studentId)!;
                    return (
                      <div key={enrollment.id} className="flex items-center justify-between text-sm py-1">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{student.lastName}, {student.firstName}</span>
                        </div>
                        <Badge variant={enrollment.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                          {enrollment.status}
                        </Badge>
                      </div>
                    );
                  })}
                  {sectionEnrollments.length > 5 && (
                    <p className="text-xs text-muted-foreground pt-1">+{sectionEnrollments.length - 5} more students</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
