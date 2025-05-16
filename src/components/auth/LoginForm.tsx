
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth.context";
import { useAppSelector } from "@/redux/hooks";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login } = useAuth();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login submission error:", err);
    }
  };

  return (
<div className="mx-auto w-full max-w-md p-6 rounded-lg border-l-2 border-maroof-green bg-white shadow-[0_4px_10px_rgba(29,185,84,0.2)] dark:bg-[#1B1918] dark:border-maroof-teal dark:shadow-[0_4px_10px_rgba(29,185,84,0.15)]">
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-foreground dark:text-white">Welcome Back</h2>
    <p className="mt-2 text-muted-foreground dark:text-gray-400">
      Sign in to your Ma'roof account
    </p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-white">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="your@email.com"
                autoComplete="email"
                disabled={isLoading}
                className="dark:bg-[#1B1918] dark:text-white dark:border-gray-700"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password Field */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-white">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="dark:bg-[#1B1918] dark:text-white dark:border-gray-700"
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-sm dark:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Forgot Password Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-maroof-teal hover:text-maroof-green dark:text-maroof-green"
        >
          Forgot password?
        </Link>
      </div>

      {/* Error Message */}
      {error && <p className="text-destructive text-sm dark:text-red-400">{error}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-maroof-green hover:bg-maroof-green/90"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-maroof-teal hover:text-maroof-green dark:text-maroof-green"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  </Form>

  {/* Demo Credentials Note */}
  <div className="mt-6 border-t border-border pt-4 dark:border-gray-700">
    <p className="text-center text-xs text-muted-foreground dark:text-gray-500">
      For demo, use email: demo@example.com and password: password
    </p>
  </div>
</div>

  );
};

export default LoginForm;
