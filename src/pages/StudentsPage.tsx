import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { students, enrollments, guardians, sections } from '@/data/mock-data';
import { Search, GraduationCap, Users } from 'lucide-react';
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
          <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Students</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">{studentList.length} students found</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border/40">
          <Users className="w-3.5 h-3.5" />
          <span className="font-medium">{students.length} Total</span>
        </div>
      </div>

      <Card className="shadow-card border border-border/50 overflow-hidden">
        <CardHeader className="pb-4 bg-muted/30 border-b border-border/40">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or LRN..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-10 text-[13px] bg-card border-border/60 rounded-lg" />
            </div>
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-full sm:w-52 h-10 text-[13px] bg-card border-border/60 rounded-lg">
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
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">LRN</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Student</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Grade & Section</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Guardian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList.map(stu => (
                  <TableRow key={stu.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{stu.lrn}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-primary">{stu.firstName[0]}{stu.lastName[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[13px] text-foreground">{stu.lastName}, {stu.firstName}</p>
                          <p className="text-[11px] text-muted-foreground">{stu.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {stu.section ? (
                        <span className="text-[13px]">Grade {stu.section.gradeLevel} - {stu.section.name}{stu.section.strand ? ` (${stu.section.strand})` : ''}</span>
                      ) : <span className="text-muted-foreground text-[13px]">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={stu.enrollment?.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] font-medium rounded-full px-2.5">
                        {stu.enrollment?.status || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[13px] text-muted-foreground">{stu.guardian ? `${stu.guardian.firstName} ${stu.guardian.lastName}` : '—'}</TableCell>
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