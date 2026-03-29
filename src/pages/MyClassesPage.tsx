import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTeachingLoadsByStaff, getSectionById, getSubjectById, enrollments, students } from '@/data/mock-data';
import { BookOpen, Users } from 'lucide-react';

export default function MyClassesPage() {
  const { user } = useAuth();
  const loads = getTeachingLoadsByStaff(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">My Classes</h1>
        <p className="text-muted-foreground text-sm">{loads.length} assigned classes this school year</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loads.map(load => {
          const subject = getSubjectById(load.subjectId);
          const section = getSectionById(load.sectionId);
          const studentCount = enrollments.filter(e => e.sectionId === load.sectionId && e.status === 'Active').length;
          return (
            <Card key={load.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{subject?.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{section?.name} — Grade {section?.gradeLevel}{section?.strand ? ` (${section.strand})` : ''}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Students</span>
                  <span className="font-medium">{studentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Schedule</span>
                  <span className="font-medium">{load.schedule || 'TBA'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subject Type</span>
                  <span className="font-medium capitalize">{subject?.type}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
