import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

import { selectIsAuthenticated } from '@/redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { signUp } from '@/config/firebase/authenticate';
import authService from '@/lib/authService';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { CheckCheck, X } from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';
import { redirectUrl } from '@/lib/envService';

const RegisterForm: React.FC = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState<string>("")
  const [score, setScore] = useState<number>(0)

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsAuthenticated);
 
  const actionCodeSettings = {
    url:  redirectUrl,
    handleCodeInApp: true
  }

  if (isLoggedIn) {
    toast({
      title: 'Already logged in',
      description: 'You are already logged in. Please log out to register a new account.',
      variant: 'destructive',
    });
    setIsLoading(false);
    return;
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }

  }, [isLoggedIn, navigate])

  // Function to handle account creation, firebase user account using email and password
  // This function will be called when the form is submitted
  async function createAnAccount(event: FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault();

    if (password.current?.value !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      });
      setIsLoading(false)
      return;
    }

    if (authService.score < 4) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password.",
        variant: "destructive",
      });
      setIsLoading(false)
      return;
    }

    try{
    if (email.current && password.current) {
      const response = await signUp(email.current.value, password.current.value);

      if (response?.success) {          
        await sendEmailVerification(response?.user?.user, actionCodeSettings)

        toast({
          title: " 🎉 Account Created",
          description: "Please check your email for the verification link.",
          variant:"primary"

        })
        navigate("/login")
      }
      else {
        toast({
          title: "Account Creation Failed",
          description: response?.message || "Please try again later.",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false)
  }catch(error:any){
    toast({
      title: "Error",
      description: error.message || "Error Occured while creating the account!",
      variant: "destructive"
    });
  }finally{
    setIsLoading(false)
  }
}

  // calculate the score of password strength
  useEffect(() => {
    if (passwordValue) setScore(authService.checkPasswordStrength(passwordValue))
  }, [passwordValue])

  return (
    <form onSubmit={createAnAccount} className="space-y-6">
      

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          ref={email}
          type="email"
          name="email"
          placeholder="Insert your email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          ref={password}
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Insert your password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className='flex flex-row items-center gap-2 justify-between'>Confirm Password{password?.current?.value === confirmPassword ?
          <CheckCheck size={15} color='#22c55e' /> : <X size={15} color='#ef4444' />}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          minLength={6}
          required
        />
      </div>

      {passwordValue !== "" && <PasswordStrengthIndicator score={score} />}
     

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <div className="text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Already have an account?</span>{' '}
        <Link to="/login" className="text-brand-600 hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
