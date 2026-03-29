import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getStudentsByGuardian, getEnrollmentByStudent, getSectionById, getSubjectsByGradeLevel, getGradesByEnrollment, getSubjectById } from '@/data/mock-data';
import { computeQuarterlyGrade, computeFinalGrade, getAcademicStanding } from '@/lib/grading';
import type { Quarter } from '@/types';

export default function ParentGradesPage() {
  const { user } = useAuth();
  const myStudents = getStudentsByGuardian(user!.refId);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Grades</h1>
        <p className="text-muted-foreground text-sm">View your child's academic performance</p>
      </div>

      {myStudents.map(student => {
        const enrollment = getEnrollmentByStudent(student.id);
        if (!enrollment) return null;
        const section = getSectionById(enrollment.sectionId);
        const subjectList = section ? getSubjectsByGradeLevel(section.gradeLevel, section.strand) : [];
        const grades = getGradesByEnrollment(enrollment.id);

        return (
          <Card key={student.id} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {student.firstName} {student.lastName}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  Grade {section?.gradeLevel} — {section?.name}{section?.strand ? ` (${section.strand})` : ''}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-card z-10">Subject</TableHead>
                      <TableHead className="text-center">Q1</TableHead>
                      <TableHead className="text-center">Q2</TableHead>
                      <TableHead className="text-center">Q3</TableHead>
                      <TableHead className="text-center">Q4</TableHead>
                      <TableHead className="text-center">Final</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectList.map(subject => {
                      const quarterGrades: (number | undefined)[] = ([1, 2, 3, 4] as Quarter[]).map(q => {
                        const gradeRecord = grades.find(g => g.subjectId === subject.id && g.quarter === q);
                        if (!gradeRecord) return undefined;
                        return computeQuarterlyGrade(gradeRecord, subject.type).quarterlyGrade;
                      });
                      const finalGrade = computeFinalGrade(quarterGrades);
                      const status = finalGrade !== undefined ? getAcademicStanding(finalGrade) : undefined;

                      return (
                        <TableRow key={subject.id}>
                          <TableCell className="sticky left-0 bg-card z-10 font-medium text-sm">{subject.name}</TableCell>
                          {quarterGrades.map((qg, i) => (
                            <TableCell key={i} className="text-center text-sm font-mono">
                              {qg !== undefined ? (
                                <span className={qg >= 75 ? 'text-foreground' : 'text-destructive'}>{qg}</span>
                              ) : '—'}
                            </TableCell>
                          ))}
                          <TableCell className="text-center text-sm font-mono font-bold">
                            {finalGrade !== undefined ? finalGrade : '—'}
                          </TableCell>
                          <TableCell className="text-center">
                            {status && (
                              <Badge variant={status === 'Passed' ? 'default' : 'destructive'} className="text-xs">
                                {status}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
