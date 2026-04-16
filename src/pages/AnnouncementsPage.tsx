import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { announcements, staff } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { Megaphone, Calendar, User } from 'lucide-react';

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const filtered = announcements.filter(a => a.isPublished && a.targetRoles.includes(user!.role));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground tracking-tight">Announcements</h1>
          <p className="text-muted-foreground text-[13px] mt-0.5">{filtered.length} announcements for you</p>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border/40">
          <Megaphone className="w-3.5 h-3.5" />
          <span className="font-medium">{filtered.length}</span>
        </div>
      </div>
      <div className="space-y-5">
        {filtered.map((ann, idx) => {
          const author = staff.find(s => s.id === ann.authorId);
          return (
            <Card key={ann.id} className="shadow-card border border-border/50 overflow-hidden hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
              {ann.imageUrl && (
                <div className="aspect-[21/9] overflow-hidden">
                  <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" loading="lazy" width={800} height={512} />
                </div>
              )}
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {ann.targetRoles.map(r => (
                    <Badge key={r} variant="secondary" className="text-[10px] capitalize font-medium rounded-full px-2">
                      {r === 'student' ? '🎓 Students' : r === 'parent' ? '👪 Parents' : r === 'teacher' ? '👨‍🏫 Teachers' : r}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-lg font-heading font-bold text-foreground mb-2">{ann.title}</h2>
                <p className="text-[13px] text-foreground/75 leading-relaxed mb-4">{ann.content}</p>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-3 border-t border-border/40">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5" />
                    {author ? `${author.firstName} ${author.lastName}` : 'Administration'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(ann.createdAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}