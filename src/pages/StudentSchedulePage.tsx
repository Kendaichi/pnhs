import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  students, getEnrollmentByStudent, getSectionById, teachingLoads,
  getSubjectById, getStaffById,
} from '@/data/mock-data';
import { CalendarDays } from 'lucide-react';

interface ScheduleEntry {
  subject: string;
  code: string;
  teacher: string;
  time: string;
  days: string;
}

export default function StudentSchedulePage() {
  const { user } = useAuth();
  if (!user) return null;

  const student = students.find(s => s.id === user.refId);
  if (!student) return <p className="text-muted-foreground p-6">Student not found.</p>;

  const enrollment = getEnrollmentByStudent(student.id);
  const section = enrollment ? getSectionById(enrollment.sectionId) : undefined;

  // Get teaching loads for this section
  const sectionLoads = section ? teachingLoads.filter(tl => tl.sectionId === section.id) : [];

  const scheduleEntries: ScheduleEntry[] = sectionLoads.map(tl => {
    const subject = getSubjectById(tl.subjectId);
    const teacher = getStaffById(tl.staffId);
    const schedule = tl.schedule || 'TBA';
    const parts = schedule.split(' ');
    const days = parts[0] || 'TBA';
    const time = parts.slice(1).join(' ') || 'TBA';

    return {
      subject: subject?.name || 'Unknown',
      code: subject?.code || '',
      teacher: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'TBA',
      time,
      days,
    };
  });

  const dayGroups: Record<string, ScheduleEntry[]> = {};
  const dayOrder = ['MWF', 'TTh', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  scheduleEntries.forEach(entry => {
    if (!dayGroups[entry.days]) dayGroups[entry.days] = [];
    dayGroups[entry.days].push(entry);
  });

  // Sort within each group by time
  Object.values(dayGroups).forEach(group => {
    group.sort((a, b) => a.time.localeCompare(b.time));
  });

  const sortedDays = Object.keys(dayGroups).sort((a, b) => {
    const idxA = dayOrder.indexOf(a);
    const idxB = dayOrder.indexOf(b);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">My Schedule</h1>
        <p className="text-muted-foreground">
          {section ? `Grade ${section.gradeLevel} — ${section.name}` : ''}
          {section?.strand && ` (${section.strand})`}
        </p>
      </div>

      {sortedDays.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="py-8 text-center text-muted-foreground">
            No schedule available yet.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedDays.map(dayKey => (
          <Card key={dayKey} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                {dayKey === 'MWF' ? 'Monday · Wednesday · Friday' : dayKey === 'TTh' ? 'Tuesday · Thursday' : dayKey}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayGroups[dayKey].map((entry, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground">{entry.subject}</p>
                      <p className="text-xs text-muted-foreground">{entry.code}</p>
                      <p className="text-xs text-muted-foreground mt-1">Teacher: {entry.teacher}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0 ml-2">{entry.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
