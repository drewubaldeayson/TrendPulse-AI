"use client";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signUpHandler = (data: z.infer<typeof formSchema>) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary-foreground">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signUpHandler)}
          className="border p-8 rounded bg-white prose min-w-[32rem] space-y-6"
        >
          <h1 className="text-center">TrendPulse-AI</h1>
          <h2 className="m-0">Sign Up</h2>
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

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute right-0 top-0" />
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
