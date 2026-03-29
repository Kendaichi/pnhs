import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download } from 'lucide-react';

export default function ReportsPage() {
  const { toast } = useToast();

  const handleGenerateSF9 = () => {
    toast({ title: 'Generating SF9...', description: 'Report Card PDF will be ready shortly.' });
    // PDF generation can be added later
  };

  const handleGenerateSF10 = () => {
    toast({ title: 'Generating SF10...', description: 'Permanent Academic Record PDF will be ready shortly.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground text-sm">Generate official DepEd forms and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">SF9 — Report Card</CardTitle>
                <p className="text-xs text-muted-foreground">Quarterly and final grades per student</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generates the official School Form 9 (Report Card) with quarterly grades, final grades, attendance summary, and academic standing.
            </p>
            <Button onClick={handleGenerateSF9} className="gap-2">
              <Download className="w-4 h-4" /> Generate SF9
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-base">SF10 — Permanent Record</CardTitle>
                <p className="text-xs text-muted-foreground">Learner's full academic history</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generates the official School Form 10 (Learner's Permanent Academic Record) with complete grade history across school years.
            </p>
            <Button onClick={handleGenerateSF10} variant="secondary" className="gap-2">
              <Download className="w-4 h-4" /> Generate SF10
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
