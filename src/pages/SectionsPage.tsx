import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sections, enrollments, staff } from '@/data/mock-data';
import { BookOpen } from 'lucide-react';

export default function SectionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Sections</h1>
        <p className="text-muted-foreground text-sm">Manage sections and class assignments</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(sec => {
          const count = enrollments.filter(e => e.sectionId === sec.id && e.status === 'Active').length;
          const adviser = staff.find(s => s.id === sec.adviserId);
          return (
            <Card key={sec.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> {sec.name}
                  </CardTitle>
                  {sec.strand && <Badge variant="secondary" className="text-xs">{sec.strand}</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Grade Level</span>
                  <span className="font-medium">{sec.gradeLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Adviser</span>
                  <span className="font-medium">{adviser ? `${adviser.firstName} ${adviser.lastName}` : '—'}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
