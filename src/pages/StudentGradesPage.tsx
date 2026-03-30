import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  students, getEnrollmentByStudent, getSectionById, getGradesByEnrollment,
  getSubjectById, subjects, sections,
} from '@/data/mock-data';
import { computeQuarterlyGrade } from '@/lib/grading';
import { Award } from 'lucide-react';
import type { Quarter, Subject } from '@/types';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

function getHonorStatus(avg: number): { label: string; color: string } | null {
  if (avg >= 98) return { label: 'With Highest Honors', color: 'bg-amber-500 text-white' };
  if (avg >= 95) return { label: 'With High Honors', color: 'bg-amber-400 text-amber-950' };
  if (avg >= 90) return { label: 'With Honors', color: 'bg-amber-300 text-amber-900' };
  return null;
}

interface SubjectRow {
  subject: Subject;
  quarters: { [key in Quarter]?: { ww: number; pt: number; qa: number; qg: number } };
  finalGrade: number | null;
  passed: boolean | null;
}

export default function StudentGradesPage() {
  const { user } = useAuth();
  if (!user) return null;

  const student = students.find(s => s.id === user.refId);
  if (!student) return <p className="text-muted-foreground p-6">Student not found.</p>;

  const enrollment = getEnrollmentByStudent(student.id);
  const section = enrollment ? getSectionById(enrollment.sectionId) : undefined;
  const grades = enrollment ? getGradesByEnrollment(enrollment.id) : [];

  // Get subjects for student's grade level/strand
  const mySubjects = subjects.filter(s =>
    s.gradeLevel === section?.gradeLevel && (!s.strand || s.strand === section?.strand)
  );

  const rows: SubjectRow[] = mySubjects.map(sub => {
    const subGrades = grades.filter(g => g.subjectId === sub.id);
    const quarters: SubjectRow['quarters'] = {};
    subGrades.forEach(g => {
      const result = computeQuarterlyGrade(g, sub.type);
      quarters[g.quarter] = {
        ww: Math.round(result.wwWeighted),
        pt: Math.round(result.ptWeighted),
        qa: Math.round(result.qaWeighted),
        qg: result.quarterlyGrade,
      };
    });

    const qgValues = Object.values(quarters).map(q => q.qg);
    const finalGrade = qgValues.length === 4 ? Math.round(qgValues.reduce((a, b) => a + b, 0) / 4) : null;

    return {
      subject: sub,
      quarters,
      finalGrade,
      passed: finalGrade !== null ? finalGrade >= 75 : null,
    };
  });

  // Overall average from available quarterly grades
  const allQG = rows.flatMap(r => Object.values(r.quarters).map(q => q.qg));
  const overallAvg = allQG.length > 0 ? Math.round((allQG.reduce((a, b) => a + b, 0) / allQG.length) * 100) / 100 : 0;
  const honor = getHonorStatus(overallAvg);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">
            {section ? `Grade ${section.gradeLevel} — ${section.name}` : ''}
            {section?.strand && ` (${section.strand})`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {honor && (
            <Badge className={`${honor.color} text-sm px-3 py-1 flex items-center gap-1`}>
              <Award className="w-3.5 h-3.5" /> {honor.label}
            </Badge>
          )}
          <Badge variant="outline" className="text-sm">Average: {overallAvg || '—'}</Badge>
        </div>
      </div>

      <Card className="shadow-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Subject</TableHead>
                  <TableHead className="text-center">Q1</TableHead>
                  <TableHead className="text-center">Q2</TableHead>
                  <TableHead className="text-center">Q3</TableHead>
                  <TableHead className="text-center">Q4</TableHead>
                  <TableHead className="text-center">Final</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.subject.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="text-foreground">{row.subject.name}</p>
                        <p className="text-xs text-muted-foreground">{row.subject.code} · {row.subject.type}</p>
                      </div>
                    </TableCell>
                    {([1, 2, 3, 4] as Quarter[]).map(q => (
                      <TableCell key={q} className="text-center">
                        {row.quarters[q] ? (
                          <div>
                            <span className={`font-semibold ${row.quarters[q]!.qg >= 75 ? 'text-success' : 'text-destructive'}`}>
                              {row.quarters[q]!.qg}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-bold">
                      {row.finalGrade !== null ? row.finalGrade : '—'}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.passed !== null ? (
                        <Badge variant={row.passed ? 'default' : 'destructive'} className={row.passed ? 'bg-success' : ''}>
                          {row.passed ? 'Passed' : 'Failed'}
                        </Badge>
                      ) : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Component breakdown per subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.filter(r => Object.keys(r.quarters).length > 0).map(row => (
          <Card key={row.subject.id} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{row.subject.name} — Component Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {([1, 2, 3, 4] as Quarter[]).map(q => {
                  const qd = row.quarters[q];
                  if (!qd) return null;
                  return (
                    <div key={q} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground font-medium">Q{q}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span>WW: {qd.ww}%</span>
                        <span>PT: {qd.pt}%</span>
                        <span>QA: {qd.qa}%</span>
                        <Badge variant="outline" className="font-semibold">{qd.qg}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
