import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { staff } from '@/data/mock-data';
import { UserCog } from 'lucide-react';

export default function StaffPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Staff Directory</h1>
        <p className="text-muted-foreground text-sm">{staff.length} personnel records</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.employeeNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                          <UserCog className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="font-medium text-sm">{s.lastName}, {s.firstName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{s.position}</TableCell>
                    <TableCell className="text-sm">{s.department || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={s.employmentStatus === 'Permanent' ? 'default' : 'secondary'} className="text-xs">
                        {s.employmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{s.email}</TableCell>
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
