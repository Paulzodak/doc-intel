"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { MdKeyboardCommandKey } from "react-icons/md";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { MailIcon } from "@/assets/svg/MailIcon";
import { BellIcon } from "@/assets/svg/BellIcon";
import Sidebar from "./Sidebar";
import { DotGridBackground } from "../atoms/DotGridBackground";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user/user.slice";
import {
  selectMobileSidebarOpen,
  selectDesktopSidebarOpen,
  setMobileSidebarOpen,
  toggleDesktopSidebar,
} from "@/redux/slices/dashboard/layout.slice";
import staticData from "@/lib/staticData";
import { TbLayoutSidebar } from "react-icons/tb";
import { QllaretyLogo } from "@/assets/svg/QllaretyLogo";
export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const mobileSidebarOpen = useSelector(selectMobileSidebarOpen);
  const desktopSidebarOpen = useSelector(selectDesktopSidebarOpen);
  const handleToggleDesktopSidebar = useCallback(() => {
    dispatch(toggleDesktopSidebar());
  }, [dispatch]);
  const handleOpenMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebarOpen(true));
  }, [dispatch]);
  const handleCloseMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebarOpen(false));
  }, [dispatch]);

  const MemojiComponent = staticData.memoji[user?.memoji ?? 1] ?? staticData.memoji[1];

  return (
    <div className="h-screen w-screen overflow-hidden flex font-nunito relative max-w-[1800px] mx-auto bg-white">
      <DotGridBackground
        dotColor="#d1d5dc"
        className="absolute w-screen h-screen inset-0 opacity-50 bg-gdray-300 "
      />
      <div className="w-screen h-screen max-h-screen  p-2 flex flex-row  sm:p-4 grsid grid-cols-1  sm:grid-cols-[18rem_auto] gap-4 min-[1500px]:p-8 min-[1500px]:gap-6 font-nunito">
        {desktopSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-100/50 rounded-2xl hidden lg:flex border border-gray-200/50 shrink-0"
          >
            <Sidebar />
          </motion.div>
        )}
        <div className="flex  grow flex-col  gap-4 relative z-10 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-100/50 rounded-2xl flex items-center justify-between px-3 py-3 border border-gray-200/50"
          >
            <div className="flex gap-4">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleOpenMobileSidebar}
                  className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer lg:hidden"
                  aria-label="Open menu"
                >
                  <TbLayoutSidebar size={18} className="text-neutral-600" />
                </button>
                <QllaretyLogo width={30} height={30} />
                <button
                  type="button"
                  onClick={handleToggleDesktopSidebar}
                  className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer hidden lg:block"
                  aria-label={desktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                >
                  <TbLayoutSidebar size={18} className="text-neutral-600" />
                </button>
              </div>
              <div className="relative hidden lg:block">
                <Input
                  placeholder="Search documents..."
                  className="bg-white rounded-full border shadow-none px-10 py-3"
                />
                <SearchIcon
                  color="#4a5565"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={18}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-sm flex gap-1 items-center justify-center text-gray-600 ">
                  <MdKeyboardCommandKey size={14} />
                  <span className="text-xs ">F</span>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-4 lg:hidden">
              <MenuIcon onClick={handleToggleSidebar} size={18} color="#101828" />
              <div className="block lg:hidden text-black">Qlarety</div>
            </div> */}
            <div className="relative h-full flex gap-4 px-2">
              <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <MailIcon className="" color="#101828" size={18} />
              </div>
              <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <BellIcon className="" color="#101828" size={18} />
              </div>
              <div>
                {MemojiComponent ? (
                  <MemojiComponent
                    size="40"
                    className="m-auto shadow-gray-200 shadow-md rounded-full cursor-pointer hover:scale-95 transition-all duration-200"
                  />
                ) : null}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100/50 rounded-2xl border border-gray-200/50 overflow-scroll h-full relative z-10 "
          >
            {children}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full absolute top-0 left-0 w-full z-50 lg:hidden"
          >
            <div
              onClick={handleCloseMobileSidebar}
              className="absolute h-full w-full top-0 left-0 bg-black/50 z-0"
              aria-hidden
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full bg-white max-w-[20rem] shadow-xl z-10"
            >
              <Sidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar - Persists across navigation */}
      {/* <DocumentSidebar */}
      {/* currentDocumentName={currentDocumentName}
        recentDocuments={recentDocuments}
        onDocumentSelect={handleDocumentSelect}
        onDocumentDelete={handleDocumentDelete}
        showCreateNew={showCreateNew}
        currentDocumentId={docId} */}
      {/* /> */}

      {/* <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="flex-1 flex flex-col lg:ml-0"
      >
        <DocumentHeader title={title} />
        {children}
      </div> */}
    </div>
  );
}
