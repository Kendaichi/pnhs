import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { announcements, staff } from '@/data/mock-data';
import { GraduationCap, ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PublicNewsPage() {
  const published = announcements.filter(a => a.isPublished).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/90 glass sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-heading font-bold text-foreground">PNHS</p>
              <p className="text-[11px] text-muted-foreground leading-none font-medium">News & Announcements</p>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold mb-3 tracking-tight">School News & Announcements</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            Stay updated with the latest happenings at PNHS (Pigdaulan National High School). All official announcements and important dates are posted here.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-6">
          {published.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No announcements at this time.</p>
          )}
          {published.map((ann, idx) => {
            const author = staff.find(s => s.id === ann.authorId);
            return (
              <Card key={ann.id} className="shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 overflow-hidden animate-fade-in" style={{ animationDelay: `${idx * 80}ms` }}>
                {ann.imageUrl && (
                  <div className="aspect-[21/9] overflow-hidden">
                    <img
                      src={ann.imageUrl}
                      alt={ann.title}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                      loading={idx === 0 ? undefined : 'lazy'}
                      width={800}
                      height={512}
                    />
                  </div>
                )}
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ann.targetRoles.map(r => (
                      <Badge key={r} variant="secondary" className="text-[10px] capitalize font-medium rounded-full px-2">
                        {r === 'student' ? '🎓 Students' : r === 'parent' ? '👪 Parents' : r === 'teacher' ? '👨‍🏫 Teachers' : r}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-2">{ann.title}</h2>
                  <p className="text-foreground/70 leading-relaxed mb-5 text-[14px]">{ann.content}</p>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-4 border-t border-border/40">
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

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/50 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-[13px] text-muted-foreground">
            © {new Date().getFullYear()} PNHS (Pigdaulan National High School) · School Management System
          </p>
        </div>
      </footer>
    </div>
  );
}