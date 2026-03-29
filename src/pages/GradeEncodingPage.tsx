import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getTeachingLoadsByStaff, getSectionById, getSubjectById, enrollments, students, gradeRecords, sections, subjects } from '@/data/mock-data';
import { computeQuarterlyGrade } from '@/lib/grading';
import type { Quarter, GradeRecord } from '@/types';
import { Save, Calculator } from 'lucide-react';

export default function GradeEncodingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isTeacher = user?.role === 'teacher';

  const loads = isTeacher ? getTeachingLoadsByStaff(user!.refId) : [];

  const [selectedLoad, setSelectedLoad] = useState(loads[0]?.id || '');
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>(1);
  const [localGrades, setLocalGrades] = useState<Record<string, Partial<GradeRecord>>>({});

  const currentLoad = loads.find(l => l.id === selectedLoad) || loads[0];
  const section = currentLoad ? getSectionById(currentLoad.sectionId) : undefined;
  const subject = currentLoad ? getSubjectById(currentLoad.subjectId) : undefined;

  const sectionStudents = useMemo(() => {
    if (!currentLoad) return [];
    const sectionEnrollments = enrollments.filter(e => e.sectionId === currentLoad.sectionId && e.status === 'Active');
    return sectionEnrollments.map(enrollment => {
      const student = students.find(s => s.id === enrollment.studentId)!;
      const existingGrade = gradeRecords.find(g => g.enrollmentId === enrollment.id && g.subjectId === currentLoad.subjectId && g.quarter === selectedQuarter);
      const localKey = `${enrollment.id}-${currentLoad.subjectId}-${selectedQuarter}`;
      const gradeData = localGrades[localKey] || existingGrade;
      return { student, enrollment, gradeData, localKey };
    });
  }, [currentLoad, selectedQuarter, localGrades]);

  const updateGrade = (localKey: string, field: keyof GradeRecord, value: number) => {
    setLocalGrades(prev => ({
      ...prev,
      [localKey]: { ...prev[localKey], [field]: value },
    }));
  };

  const handleSave = () => {
    toast({ title: 'Grades Saved', description: `Q${selectedQuarter} grades for ${subject?.name} — ${section?.name} have been saved.` });
  };

  if (!isTeacher || loads.length === 0) {
    // Admin/Registrar view — show all grades overview
    return (
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-heading font-bold text-foreground">Grade Records</h1>
        <p className="text-muted-foreground">Overview of all submitted grade records.</p>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{gradeRecords.length} grade records submitted across all sections.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Grade Encoding</h1>
        <p className="text-muted-foreground">Enter scores for your assigned classes. The system auto-computes grades using the DepEd formula.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedLoad} onValueChange={setSelectedLoad}>
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {loads.map(load => {
              const sub = getSubjectById(load.subjectId);
              const sec = getSectionById(load.sectionId);
              return <SelectItem key={load.id} value={load.id}>{sub?.name} — {sec?.name}</SelectItem>;
            })}
          </SelectContent>
        </Select>
        <Select value={String(selectedQuarter)} onValueChange={v => setSelectedQuarter(Number(v) as Quarter)}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Quarter 1</SelectItem>
            <SelectItem value="2">Quarter 2</SelectItem>
            <SelectItem value="3">Quarter 3</SelectItem>
            <SelectItem value="4">Quarter 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {subject && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calculator className="w-3.5 h-3.5" />
          <span>
            Weights: WW {subject.type === 'core' ? '25%' : '20%'} · PT {subject.type === 'core' ? '50%' : '60%'} · QA {subject.type === 'core' ? '25%' : '20%'}
            <span className="ml-2">({subject.type === 'core' ? 'Core Subject' : 'Applied/TLE'})</span>
          </span>
        </div>
      )}

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-card z-10">Student</TableHead>
                  <TableHead className="text-center">WW Score</TableHead>
                  <TableHead className="text-center">WW HP</TableHead>
                  <TableHead className="text-center">PT Score</TableHead>
                  <TableHead className="text-center">PT HP</TableHead>
                  <TableHead className="text-center">QA Score</TableHead>
                  <TableHead className="text-center">QA HP</TableHead>
                  <TableHead className="text-center">Initial Grade</TableHead>
                  <TableHead className="text-center">Quarterly Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionStudents.map(({ student, gradeData, localKey }) => {
                  const ww = Number(gradeData?.wwRawScore) || 0;
                  const wwHP = Number(gradeData?.wwHighestPossible) || 100;
                  const pt = Number(gradeData?.ptRawScore) || 0;
                  const ptHP = Number(gradeData?.ptHighestPossible) || 100;
                  const qa = Number(gradeData?.qaRawScore) || 0;
                  const qaHP = Number(gradeData?.qaHighestPossible) || 100;

                  const mockRecord: GradeRecord = {
                    id: '', enrollmentId: '', subjectId: '', quarter: selectedQuarter,
                    wwRawScore: ww, wwHighestPossible: wwHP,
                    ptRawScore: pt, ptHighestPossible: ptHP,
                    qaRawScore: qa, qaHighestPossible: qaHP,
                  };
                  const computed = subject ? computeQuarterlyGrade(mockRecord, subject.type) : null;

                  return (
                    <TableRow key={student.id}>
                      <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm whitespace-nowrap">
                        {student.lastName}, {student.firstName}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={0} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.wwRawScore ?? ''} onChange={e => updateGrade(localKey, 'wwRawScore', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={1} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.wwHighestPossible ?? 100} onChange={e => updateGrade(localKey, 'wwHighestPossible', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={0} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.ptRawScore ?? ''} onChange={e => updateGrade(localKey, 'ptRawScore', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={1} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.ptHighestPossible ?? 100} onChange={e => updateGrade(localKey, 'ptHighestPossible', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={0} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.qaRawScore ?? ''} onChange={e => updateGrade(localKey, 'qaRawScore', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input type="number" min={1} className="w-16 mx-auto text-center h-8 text-sm" value={gradeData?.qaHighestPossible ?? 100} onChange={e => updateGrade(localKey, 'qaHighestPossible', Number(e.target.value))} />
                      </TableCell>
                      <TableCell className="text-center text-sm font-mono">{computed?.initialGrade ?? '—'}</TableCell>
                      <TableCell className="text-center">
                        {computed ? (
                          <Badge variant={computed.quarterlyGrade >= 75 ? 'default' : 'destructive'} className="font-mono">
                            {computed.quarterlyGrade}
                          </Badge>
                        ) : '—'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" /> Save Grades
        </Button>
      </div>
    </div>
  );
}
