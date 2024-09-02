"use client";
import { auth } from "@/firebase/config";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const formSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [createUserWithEmailAndPassword, _user, _loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, _updating, _error] = useUpdateProfile(auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signUpHandler = async (data: z.infer<typeof formSchema>) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-primary-foreground">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signUpHandler)}
          className="border p-8 rounded bg-white prose w-full max-w-[32rem] space-y-6"
        >
          <h1 className="text-center">TrendPulse AI</h1>
          <h2 className="m-0">Sign Up</h2>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0" />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Sign Up</Button>
          <p
            className={clsx("text-destructive", {
              hidden: !error,
            })}
          >
            An account with this email already exists.
          </p>
          <Link href="/sign-in" className="underline">
            <p>Already have an account?</p>
          </Link>
        </form>
      </Form>
    </main>
  );
}
