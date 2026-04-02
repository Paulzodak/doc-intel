"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { LockIcon } from "@/assets/svg/LockIcon";
import { FileIcon2 } from "@/assets/svg/FileIcon2";
import { CreditCardIcon } from "@/assets/svg/CreditCardIcon";
import { useDispatch, useSelector } from "react-redux";
import { setShowSetting } from "@/redux/slices/settings/settings.slice";
import { selectUser } from "@/redux/slices/user/user.slice";
import General from "./General";
import Documents from "./Documents";

export default function SettingsModal() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowSetting(false));
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center p-4 font-jakarta">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={handleClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, height: 0 }}
        animate={{ scale: 1, opacity: 1, height: "auto" }}
        exit={{ scale: 0.95, opacity: 0, height: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bordser border-amber-800 grid w-[50rem] h-[35rem] max-h-[35rem] min-h-[35rem] bg-white rounded-2xl shadow-xl overflow-hidden  "
      >
        {/* <div className=" text-black w-[50rem] h-[35rem] border-4 border-b-fuchsia-500 grid grid-cols-2 overflow-scroll   "> */}
        <Tabs
          defaultValue="general"
          className="w-full h-full! overflow-hidden bsorder-b-amber-800 bsorder  bg-gray-100 "
        >
          <div className="h-full bordser border-red-500 overflow-hidden max-w-full grid grid-rows-[4rem_31rem] sm:grid-rows-none sm:grid-cols-[3fr_8fr] sm:gap-6  ">
            <div className="bordser border-blue-500 sm:h-full sm:flex sm:flex-col p-2 sm:p-4 w-full max-w-full overflow-scroll ">
              <h1 className="text-2xl font-bold hidden sm:block text-black">Settings</h1>
              {/* <div className="border border-blue-500 overflow-hidden !w-full !max-w-full"> */}
              <TabsList className=" flex! sm:mt-4 p-0!  sm:h-auto  bosrder bosrder-red-700 w-full bg-gray-100/70 sm:flex sm:flex-col sm:items-stretch rounded-lg sm:p-1">
                <TabsTrigger
                  value="general"
                  className="sm:w-full sm:justify-start gap-2 rounded-md"
                >
                  <SettingsIcon size={18} color="currentColor" />
                  <p className="sm:block hidden">General</p>
                </TabsTrigger>
                {/* <TabsTrigger value="account" className="w-full justify-start gap-2">
                    <LockIcon size={18} color="currentColor" />
                    Account
                  </TabsTrigger> */}
                <TabsTrigger
                  value="notifications"
                  className="sm:w-full sm:justify-start gap-2 rounded-md"
                >
                  <FileIcon2 size={18} color="currentColor" />
                  <p className="sm:block hidden">Documents</p>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="sm:w-full sm:justify-start gap-2 rounded-md"
                >
                  <CreditCardIcon size={18} color="currentColor" />
                  <p className="sm:block hidden">Billing</p>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="sm:w-full sm:justify-start gap-2 rounded-md"
                >
                  <LockIcon size={18} color="currentColor" />
                  <p className="sm:block hidden">Security</p>
                </TabsTrigger>
              </TabsList>
              {/* </div> */}
            </div>

            <div className="max-h-full! grid overflow-scroll  rounded-2xl border border-gray-100">
              <TabsContent
                value="general"
                className="mt-0 max-h-full! overflow-scroll borsder border-red-500"
              >
                {user && <General user={user} />}
                {/* {user && <General user={user} />} */}
              </TabsContent>
              <TabsContent value="account" className="mt-0 h-full">
                <div className="bg-white h-full rounded-lg p-4">Account settings</div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-0 h-full">
                {user && <Documents user={user} />}
              </TabsContent>
              <TabsContent value="billing" className="mt-0 h-full">
                <div className="bg-white h-full rounded-lg p-4">Billing settings</div>
              </TabsContent>
              <TabsContent value="security" className="mt-0 h-full">
                <div className="bg-white h-full rounded-lg p-4">Security settings</div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
        {/* </div> */}
      </motion.div>
    </div>
  );
}
