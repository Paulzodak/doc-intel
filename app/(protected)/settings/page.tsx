import { BellIcon } from "@/assets/svg/BellIcon";
import { CreditCardIcon } from "@/assets/svg/CreditCardIcon";
import { FileIcon } from "@/assets/svg/FileIcon";
import { FileIcon2 } from "@/assets/svg/FileIcon2";
import { LockIcon } from "@/assets/svg/LockIcon";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="p-6 text-black max-w-[60rem] mxs-auto ">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs defaultValue="general" className="w-full max-w-full  mt-4">
        <TabsList className="h-12">
          <TabsTrigger value="general">
            <SettingsIcon size={18} color="currentColor" />
            General
          </TabsTrigger>
          <TabsTrigger value="account">
            <LockIcon size={18} color="currentColor" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <FileIcon2 size={18} color="currentColor" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="notificationss">
            <CreditCardIcon size={18} color="currentColor" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <div className="bg-jwhite h-full rounded-lg borjder p-4">
            <div className=" gap-4">
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="name">Name</label>
                <Input id="name" placeholder="Name" />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <div className="bg-white h-full rounded-lg border p-4">Account settings</div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <div className="bg-white h-full rounded-lg border p-4">Notification settings</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
