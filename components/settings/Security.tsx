"use client";

import { User } from "@/types/user";
import { Button } from "../ui/button";
import { useState } from "react";
import ChangePasswordModal from "./Security/ChangePasswordModal";
import ResetPasswordModal from "./Security/ResetPasswordModal";

export default function Security({ user }: { user: User }) {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  return (
    <div className="bg-white h-full overflow-scroll rounded-lg border p-4">
      <div className="grid text-sm text-black gap-4">
        <h2 className="text-lg font-bold">Security</h2>
        <hr className="border-gray-100" />
        <div className="grid grid-cols-[5fr_8fr] gap-2">
          <label htmlFor="change-password" className="font-semibold my-auto">
            Change password
          </label>
          <div className="flex justify-end items-center gap-2">
            <Button
              id="change-password"
              onClick={() => setShowChangePasswordModal(true)}
              variant="primary-green"
              className="ws-full rounded-full px-6 py-2 h-10 shadow-none"
            >
              <span className="text-sm">Manage</span>
            </Button>
          </div>
        </div>

        <hr className="border-gray-100" />
        <div className="grid grid-cols-[5fr_8fr] gap-2">
          <label htmlFor="reset-password" className="font-semibold my-auto">
            Reset Password
          </label>
          <div className="flex justify-end items-center gap-2">
            <Button
              id="reset-password"
              onClick={() => setShowResetPasswordModal(true)}
              variant="primary-green"
              className="ws-full rounded-full px-6 py-2 h-10 shadow-none"
            >
              <span className="text-sm">Manage</span>
            </Button>
          </div>
        </div>
      </div>

      {showChangePasswordModal && (
        <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />
      )}
      {showResetPasswordModal && (
        <ResetPasswordModal
          user={user}
          onClose={() => setShowResetPasswordModal(false)}
        />
      )}
    </div>
  );
}
