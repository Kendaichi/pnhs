import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Eye, EyeOff, ArrowRight, Newspaper, Shield, BookOpen, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({ title: 'Error', description: 'Please enter your username.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = login(username.trim(), password);
      if (!success) {
        toast({ title: 'Login Failed', description: 'Invalid username or password.', variant: 'destructive' });
      }
      setLoading(false);
    }, 400);
  };

  const demoAccounts = [
    { username: 'admin', role: 'Admin', emoji: '🛡️', color: 'bg-primary/10 text-primary' },
    { username: 'teacher1', role: 'Teacher', emoji: '👨‍🏫', color: 'bg-secondary/10 text-secondary' },
    { username: 'registrar', role: 'Registrar', emoji: '📋', color: 'bg-accent/10 text-accent' },
    { username: 'parent1', role: 'Parent', emoji: '👪', color: 'bg-info/10 text-info' },
    { username: '100000000001', role: 'Student', emoji: '🎓', color: 'bg-success/10 text-success' },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[55%] gradient-primary relative items-center justify-center p-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-white/[0.06] blur-3xl" />
          <div className="absolute bottom-32 right-16 w-[28rem] h-[28rem] rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/[0.03] blur-2xl" />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="relative text-white max-w-lg space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.12] backdrop-blur-md border border-white/[0.08]">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-[2.75rem] font-heading font-extrabold leading-[1.1] tracking-tight">
              Pigdaulan National<br />High School
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mt-4 max-w-md">
              Empowering learners through excellence in education. Access grades, attendance, and academic records in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm text-sm font-medium border border-white/[0.06]">
              <Shield className="w-3.5 h-3.5" /> DepEd K-12
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm text-sm font-medium border border-white/[0.06]">
              <BookOpen className="w-3.5 h-3.5" /> S.Y. 2025-2026
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-sm text-sm font-medium border border-white/[0.06]">
              <Users className="w-3.5 h-3.5" /> 5 Sections
            </div>
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background gradient-surface">
        <div className="w-full max-w-[420px] animate-fade-in space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground">PNHS</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Pigdaulan National High School</p>
          </div>

          <Card className="shadow-elevated border border-border/50 bg-card">
            <CardHeader className="pb-2 space-y-1.5 px-6 pt-6">
              <CardTitle className="text-xl font-heading font-bold">Welcome back</CardTitle>
              <CardDescription className="text-[13px]">Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[13px] font-medium">Username</Label>
                  <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username or LRN" autoComplete="username" className="h-11 text-[13px] rounded-lg bg-muted/40 border-border/60 focus:bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[13px] font-medium">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" className="h-11 text-[13px] pr-10 rounded-lg bg-muted/40 border-border/60 focus:bg-card" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-semibold text-[13px] rounded-lg shadow-md hover:shadow-lg transition-all duration-200" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-border/60">
                <p className="text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-widest">Quick Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map(acc => (
                    <button key={acc.username} onClick={() => { setUsername(acc.username); setPassword('demo'); }} className="text-left text-sm px-3 py-2.5 rounded-lg border border-border/50 bg-card hover:bg-muted/60 hover:border-primary/25 transition-all duration-200 group">
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{acc.emoji}</span>
                        <span>
                          <span className="font-semibold text-foreground block text-xs">{acc.role}</span>
                          <span className="text-muted-foreground text-[10px] font-medium">{acc.username}</span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/news" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium">
              <Newspaper className="w-4 h-4" />
              View School News & Announcements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}