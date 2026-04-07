"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { LockIcon } from "@/assets/svg/LockIcon";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/data/auth";
import { User } from "@/types/user";

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordModal({
  onClose,
  user,
}: {
  onClose: () => void;
  user: User;
}) {
  const { mutate: sendResetEmail, isPending } = useForgotPassword();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: user.email ?? "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    sendResetEmail(values, {
      onSuccess: () => {
        form.reset(values);
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 font-jakarta">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, height: 0 }}
        animate={{ scale: 1, opacity: 1, height: "auto" }}
        exit={{ scale: 0.95, opacity: 0, height: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="shrink-0 border-b border-gray-100 p-4 sm:p-6">
          <div className="flex items-center gap-2 pr-10">
            <LockIcon size={20} color="#6b7280" />
            <h3 className="text-lg font-bold text-gray-900">Reset Password</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <CloseIcon color="#6b7280" className="text-gray-500" size={20} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 sm:p-6">
            <p className="text-sm text-gray-600">
              Enter your account email and we will send you a password reset link.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-gray-900">
                    Email
                  </label>
                  <FormControl>
                    <Input
                      id="reset-email"
                      type="email"
                      autoComplete="email"
                      className="h-11 rounded-full border-gray-200 py-3"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-full px-5 shadow-none"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary-green"
                className="h-10 rounded-full px-5 shadow-none"
                isLoading={isPending}
                showSpinner
              >
                {!isPending && "Send reset email"}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
