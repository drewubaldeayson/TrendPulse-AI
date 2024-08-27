"use client";
import { createContext, useContext } from "react";
import {
  useForm,
  FormProvider as RHFProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormData {
  message: string;
}

const FormContext = createContext<UseFormReturn<
  FormData,
  any,
  undefined
> | null>(null);

export default function FormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  });

  return (
    <FormContext.Provider value={methods}>
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
}

export function useFormData() {
  return useContext(FormContext);
}
