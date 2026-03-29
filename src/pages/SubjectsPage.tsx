import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subjects } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList } from 'lucide-react';

export default function SubjectsPage() {
  const grouped = subjects.reduce((acc, sub) => {
    const key = `Grade ${sub.gradeLevel}${sub.strand ? ` - ${sub.strand}` : ''}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(sub);
    return acc;
  }, {} as Record<string, typeof subjects>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Subjects</h1>
        <p className="text-muted-foreground text-sm">K-12 curriculum subjects per grade level</p>
      </div>
      {Object.entries(grouped).map(([group, subs]) => (
        <Card key={group} className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-primary" /> {group}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weights (WW / PT / QA)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.map(sub => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-xs">{sub.code}</TableCell>
                    <TableCell className="font-medium text-sm">{sub.name}</TableCell>
                    <TableCell>
                      <Badge variant={sub.type === 'core' ? 'default' : 'secondary'} className="text-xs capitalize">{sub.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.type === 'core' ? '25% / 50% / 25%' : '20% / 60% / 20%'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
