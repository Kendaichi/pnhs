import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    { username: 'admin', role: 'Admin', color: 'bg-primary' },
    { username: 'teacher1', role: 'Teacher', color: 'bg-secondary' },
    { username: 'registrar', role: 'Registrar', color: 'bg-accent' },
    { username: 'parent1', role: 'Parent', color: 'bg-info' },
    { username: '100000000001', role: 'Student', color: 'bg-success' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Rizal National High School</h1>
          <p className="text-muted-foreground mt-1">School Management System</p>
        </div>

        <Card className="shadow-elevated border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoComplete="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Demo accounts (any password):</p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map(acc => (
                  <button key={acc.username} onClick={() => { setUsername(acc.username); setPassword('demo'); }} className="text-left text-xs px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                    <span className="font-medium text-foreground">{acc.role}</span>
                    <span className="block text-muted-foreground">{acc.username}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
