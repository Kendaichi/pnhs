import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Eye, EyeOff, ArrowRight, Newspaper } from 'lucide-react';
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
    { username: 'admin', role: 'Admin', emoji: '🛡️' },
    { username: 'teacher1', role: 'Teacher', emoji: '👨‍🏫' },
    { username: 'registrar', role: 'Registrar', emoji: '📋' },
    { username: 'parent1', role: 'Parent', emoji: '👪' },
    { username: '100000000001', role: 'Student', emoji: '🎓' },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative text-white max-w-md space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-heading font-bold leading-tight">
            Rizal National<br />High School
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Empowering learners through excellence in education. Access grades, attendance, and academic records in one place.
          </p>
          <div className="flex gap-3 pt-4">
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm">DepEd K-12</div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm">S.Y. 2025-2026</div>
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-fade-in space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">PNHS (Pigdaulan National High School)</h1>
            <p className="text-muted-foreground mt-1">School Management System</p>
          </div>

          <Card className="shadow-elevated border-0 bg-card">
            <CardHeader className="pb-2 space-y-1">
              <CardTitle className="text-xl font-heading">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username or LRN" autoComplete="username" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" className="h-11 pr-10" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-medium" disabled={loading}>
                  {loading ? 'Signing in...' : (
                    <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Demo Accounts</p>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map(acc => (
                    <button key={acc.username} onClick={() => { setUsername(acc.username); setPassword('demo'); }} className="text-left text-sm px-3 py-2.5 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/20 transition-all group">
                      <span className="flex items-center gap-2">
                        <span>{acc.emoji}</span>
                        <span>
                          <span className="font-medium text-foreground block text-xs">{acc.role}</span>
                          <span className="text-muted-foreground text-[11px]">{acc.username}</span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Newspaper className="w-4 h-4" />
              View School News & Announcements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
