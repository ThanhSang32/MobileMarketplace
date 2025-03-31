import { useState } from 'react';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z.string().min(1, { message: 'Please enter your password' })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Set up the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  // Set up the mutation
  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Login successful',
        description: 'Welcome back'
      });
      navigate('/');
    },
    onError: (error: Error) => {
      setError(error.message);
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    await mutation.mutateAsync(data);
  };

  return (
    <div className="container py-10 max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your login information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            <Button variant="link" className="p-0" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;