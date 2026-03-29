import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { students, enrollments, guardians, sections } from '@/data/mock-data';
import { Search, GraduationCap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');

  const studentList = useMemo(() => {
    return students.map(stu => {
      const enrollment = enrollments.find(e => e.studentId === stu.id && e.schoolYearId === 'sy-2025');
      const section = enrollment ? sections.find(s => s.id === enrollment.sectionId) : undefined;
      const guardian = guardians.find(g => g.id === stu.guardianId);
      return { ...stu, enrollment, section, guardian };
    }).filter(stu => {
      const matchSearch = !search || `${stu.firstName} ${stu.lastName} ${stu.lrn}`.toLowerCase().includes(search.toLowerCase());
      const matchSection = sectionFilter === 'all' || stu.section?.id === sectionFilter;
      return matchSearch && matchSection;
    });
  }, [search, sectionFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground text-sm">{studentList.length} students found</p>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or LRN..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map(s => (
                  <SelectItem key={s.id} value={s.id}>Grade {s.gradeLevel} - {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>LRN</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade & Section</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Guardian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList.map(stu => (
                  <TableRow key={stu.id}>
                    <TableCell className="font-mono text-xs">{stu.lrn}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{stu.lastName}, {stu.firstName}</p>
                          <p className="text-xs text-muted-foreground">{stu.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {stu.section ? (
                        <span className="text-sm">Grade {stu.section.gradeLevel} - {stu.section.name}{stu.section.strand ? ` (${stu.section.strand})` : ''}</span>
                      ) : <span className="text-muted-foreground text-sm">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stu.enrollment?.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                        {stu.enrollment?.status || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{stu.guardian ? `${stu.guardian.firstName} ${stu.guardian.lastName}` : '—'}</TableCell>
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
