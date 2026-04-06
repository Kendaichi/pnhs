import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { announcements, staff } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { Megaphone } from 'lucide-react';

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const filtered = announcements.filter(a => a.isPublished && a.targetRoles.includes(user!.role));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Announcements</h1>
        <p className="text-muted-foreground text-sm">{filtered.length} announcements</p>
      </div>
      <div className="space-y-4">
        {filtered.map(ann => {
          const author = staff.find(s => s.id === ann.authorId);
          return (
            <Card key={ann.id} className="shadow-card overflow-hidden">
              {ann.imageUrl && (
                <div className="aspect-[21/9] overflow-hidden">
                  <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" loading="lazy" width={800} height={512} />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Megaphone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{ann.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {author ? `${author.firstName} ${author.lastName}` : 'Unknown'} · {new Date(ann.createdAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {ann.targetRoles.map(r => (
                      <Badge key={r} variant="secondary" className="text-[10px] capitalize">{r}</Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">{ann.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
