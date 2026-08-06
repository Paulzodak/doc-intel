"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CloseIcon } from "@/assets/svg/CloseIcon";
import { LockIcon } from "@/assets/svg/LockIcon";
import { PasswordInput } from "@/components/atoms/form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/data/user";
import { ToastLogger } from "@/utils/toastUtils";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmNewPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

type PasswordFieldName = "oldPassword" | "newPassword" | "confirmNewPassword";

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { mutate: changePassword, isPending } = useChangePassword();
  const [hidePasswords, setHidePasswords] = useState<Record<PasswordFieldName, boolean>>({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const toggleHidePassword = (field: PasswordFieldName) => {
    setHidePasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    changePassword(
      {
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          ToastLogger.success("auth", "Password updated");
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 font-google-sans">
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
            <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
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
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="oldPassword"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Old password
                  </label>
                  <FormControl>
                    <PasswordInput
                      id="oldPassword"
                      hidePassword={hidePasswords.oldPassword}
                      onToggleHide={() => toggleHidePassword("oldPassword")}
                      autoComplete="current-password"
                      placeholder="Enter old password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    New password
                  </label>
                  <FormControl>
                    <PasswordInput
                      id="newPassword"
                      hidePassword={hidePasswords.newPassword}
                      onToggleHide={() => toggleHidePassword("newPassword")}
                      autoComplete="new-password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="confirmNewPassword"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Confirm new password
                  </label>
                  <FormControl>
                    <PasswordInput
                      id="confirmNewPassword"
                      hidePassword={hidePasswords.confirmNewPassword}
                      onToggleHide={() => toggleHidePassword("confirmNewPassword")}
                      autoComplete="new-password"
                      placeholder="Confirm new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2 text-black text-sm">
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
                {!isPending && "Update password"}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
