
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth.context";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addUserPoints } from "@/redux/slices/authSlice";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userType: z.enum(["individual", "business"]),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const { register } = useAuth();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const userType = searchParams.get("type") === "business" ? "business" : "individual";

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType,
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(
        {
          name: data.name,
          email: data.email,
          userType: data.userType,
        },
        data.password
      );

        // Add activity and points
            
            dispatch(addUserPoints(20));
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration submission error:", err);
    }
  };

  return (
<div className="mx-auto w-full max-w-md p-6 rounded-lg border-l-2 border-maroof-green bg-white shadow-[0_4px_10px_rgba(29,185,84,0.2)] dark:bg-[#1B1918] dark:border-maroof-teal dark:shadow-[0_4px_10px_rgba(29,185,84,0.15)]">
  <div className="mb-6 text-center">
    <h2 className="text-2xl font-bold text-foreground dark:text-white">Create an Account</h2>
    <p className="mt-2 text-muted-foreground dark:text-gray-300">
      Join Ma'roof and start reducing food waste
    </p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-white">Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your name or organization"
                disabled={isLoading}
                className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d] dark:placeholder-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
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
                className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d] dark:placeholder-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Account Type */}
      <FormField
        control={form.control}
        name="userType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-white">Account Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d]">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d]">
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="business">Business/Organization</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Password */}
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
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d] dark:placeholder-gray-500 pr-20"
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-sm"
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

      {/* Confirm Password */}
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-white">Confirm Password</FormLabel>
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isLoading}
                className="dark:bg-[#1B1918] dark:text-white dark:border-[#3a3a4d] dark:placeholder-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Terms */}
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-1">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal dark:text-gray-300">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-maroof-teal hover:text-maroof-green"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-maroof-teal hover:text-maroof-green"
                >
                  Privacy Policy
                </Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* Error */}
      {error && <p className="text-destructive text-sm">{error}</p>}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-maroof-green hover:bg-maroof-green/90"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>

      {/* Footer */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-maroof-teal hover:text-maroof-green"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  </Form>
</div>

  );
};

export default RegisterForm;
