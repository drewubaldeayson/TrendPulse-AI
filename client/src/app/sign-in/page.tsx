"use client";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function SignIn() {
  const [signInWithEmailAndPassword, _user, _loading, error] =
    useSignInWithEmailAndPassword(auth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signInHandler = (data: z.infer<typeof formSchema>) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary-foreground">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signInHandler)}
          className="border p-8 rounded bg-white prose min-w-[32rem] space-y-6"
        >
          <h1 className="text-center">TrendPulse-AI</h1>
          <h2 className="m-0">Sign In</h2>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="absolute right-0 top-0" />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage className="absolute right-0 top-0" />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit">Sign In</Button>
          <p
            className={clsx("text-destructive", {
              hidden: !error,
            })}
          >
            Invalid email or password. Please try again.
          </p>
          <Link href="/sign-up" className="underline">
            <p>Don't have an account?</p>
          </Link>
        </form>
      </Form>
    </main>
  );
}
