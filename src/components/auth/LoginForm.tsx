
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);   

    try {
      const loginStatus = await login(email, password,true);     
      toast({
        title: '🎉 Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } catch (error) {    
      toast({
        title: 'Login failed',
        description: (error instanceof Error) ? error.message : 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>{' '}
        <Link to="/register" className="text-brand-600 hover:underline">
          Sign up
        </Link>
      </div>
      
      {/* Demo credentials */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500 mb-2">Demo credentials:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setEmail('admin.demo@fq.com');
              setPassword('Admin@01');
            }}
          >
            Admin Demo
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail('student.demo@fq.com');
              setPassword('Student@01');
            }}
          >
            Student Demo
          </Button>
         
          <Button 
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail('teacher.demo@fq.com');
              setPassword('Teacher@01');
            }}
          >
            Teacher Demo
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
