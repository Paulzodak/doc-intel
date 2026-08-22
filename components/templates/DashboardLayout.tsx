"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailIcon } from "@/assets/svg/MailIcon";
import { BellIcon } from "@/assets/svg/BellIcon";
import Sidebar from "./Sidebar";
import { DotGridBackground } from "../atoms/DotGridBackground";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slices/user/user.slice";
import {
  selectMobileSidebarOpen,
  selectMobileRightSidebarOpen,
  selectDesktopSidebarOpen,
  setMobileSidebarOpen,
  setMobileRightSidebarOpen,
  toggleDesktopSidebar,
} from "@/redux/slices/dashboard/layout.slice";
import staticData from "@/lib/staticData";
import { TbLayoutSidebar } from "react-icons/tb";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { AppSearch } from "../dashboardLayout/AppSearch";
import SettingsModal from "../settings/SettingsModal";
import { selectShowSetting } from "@/redux/slices/settings/settings.slice";
import RightSidebar from "./RIghtSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const showSettingsModal = useSelector(selectShowSetting);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const mobileSidebarOpen = useSelector(selectMobileSidebarOpen);
  const mobileRightSidebarOpen = useSelector(selectMobileRightSidebarOpen);
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
  const handleOpenMobileRightSidebar = useCallback(() => {
    dispatch(setMobileRightSidebarOpen(true));
  }, [dispatch]);
  const handleCloseMobileRightSidebar = useCallback(() => {
    dispatch(setMobileRightSidebarOpen(false));
  }, [dispatch]);

  const MemojiComponent = staticData.memoji[user?.memoji ?? 1] ?? staticData.memoji[1];

  return (
    <div className="h-screen w-screen  overflow-hidden flexs font-nunito relative masx-w-[1800px] ssmx-auto bg-gray-100/40">
      {/* <DotGridBackground
        dotColor="#d1d5dc"
        className="absolute w-screen h-screen inset-0 opacity-50 bg-gdray-300"
      /> */}
      <div
        // className="w-screen border border-blue-800 h-screen max-h-screen pss-2 flex flex-row  sm:ps-8 grsid grisd-cols-1  sm:grisd-cols-[18rem_auto] gsasp-4 min-[1500px]:ps-8 min-[1500px]:gasps-6 font-nunito">
        className="flex h-screen font-nunito"
      >
        {desktopSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2sxl hidden relative lg:flex border border-gray-200/50 shrink-0"
          >
            <Sidebar />
          </motion.div>
        )}
        <div className="flex px-2 py-4 sm:p-4 lg:p-8 grow flex-col  gap-6 relkative z-10 max-w-[80rem] mx-auto ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bag-gray-100/50 bg-white rounded-2xl flex items-center justify-between px-3 py-3 border border-gray-200"
          >
            <div className="flex gap-4 ">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleOpenMobileSidebar}
                  className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer lg:hidden"
                  aria-label="Open menu"
                >
                  <TbLayoutSidebar size={18} className="text-neutral-600" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleDesktopSidebar}
                  className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer hidden lg:block"
                  aria-label={desktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                >
                  <TbLayoutSidebar size={18} className="text-neutral-600" />
                </button>
              </div>
              <AppSearch />
            </div>
            <div className="flex items-center gap-2">
              <QlaretyLogo className="hidden lg:block" width={30} height={30} />
              <div className="hidden  lg:block text-gray-600 font-bold text-sm ">Qlarety</div>
            </div>
            {/* <div className="flex gap-4 lg:hidden">
              <MenuIcon onClick={handleToggleSidebar} size={18} color="#101828" />
              <div className="block lg:hidden text-black">Qlarety</div>
            </div> */}
            <div className="relative h-full flex gap-4 px-2">
              <div className="flex md:w-32"></div>
              {/* <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <MailIcon className="" color="#101828" size={18} />
              </div>
              <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
                <BellIcon className="" color="#101828" size={18} />
              </div> */}
              <div>
                {MemojiComponent ? (
                  <MemojiComponent
                    size="40"
                    className="m-auto shadow-gray-200 shadow-md rounded-full cursor-pointer hover:scale-95 transition-all duration-200"
                  />
                ) : null}
              </div>
              <button
                type="button"
                onClick={handleOpenMobileRightSidebar}
                className="hover:bg-neutral-200/50 p-2 lg:hidden rounded-sm cursor-pointer lg:hidden"
                aria-label="Open right panel"
              >
                <TbLayoutSidebar size={18} className="text-neutral-600 rotate-180" />
              </button>
            </div>
          </motion.div>
          <div className="bordesr border-green-800 grid h-full overflow-scroll">{children}</div>
          {/* <div className="grid grid-cols-[3fr_1fr] gap-8 flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bgs-gray-100/50 roundsed-2xl borsder borsder-gray-200/50 overflow-scroll h-full relaktive "
            >
              {children}
            </motion.div>
            <motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="kbg-gray-100/50 rounded-2xl border h-[40rem] border-gray-200 overflow-scroll  relaktive "
              >
                {children}
              </motion.div>
            </motion.div>
          </div> */}
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
      <AnimatePresence>
        {mobileRightSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full absolute top-0 left-0 w-full z-50 lg:hidden"
          >
            <div
              onClick={handleCloseMobileRightSidebar}
              className="absolute h-full w-full top-0 left-0 bg-black/50 z-0"
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2 }}
              className="relative h-full bordesr border-blue-800 w-full bg-white max-w-[20rem] shadow-xl z-10 ml-auto"
            >
              <RightSidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{showSettingsModal ? <SettingsModal /> : null}</AnimatePresence>

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
