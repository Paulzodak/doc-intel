"use client";

import { useMemo, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import { motion } from "framer-motion";
import DocumentInput from "@/components/documentInput/DocumentInput";
import { Input } from "@/components/ui/input";
import { MdKeyboardCommandKey } from "react-icons/md";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { MailIcon } from "@/assets/svg/MailIcon";
import { BellIcon } from "@/assets/svg/BellIcon";
import { MenuIcon } from "@/assets/svg/MenuIcon";
import {
  FiFileText,
  FiClock,
  FiChevronRight,
  FiMoreVertical,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { KeyIcon } from "@/assets/svg/KeyIcon";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/assets/svg/PlusIcon";

export default function DashboardPage() {
  const { generateUniqueName } = useDocumentNames();

  // Initialize document name only once
  const [documentName, setDocumentName] = useState(() => generateUniqueName());

  return (
    <div className="w-screen h-screen max-h-screen border border-red-800 bjg-red-500 p-2 flex flex-row  sm:p-4 grsid grid-cols-1  sm:grid-cols-[18rem_auto] gap-4 min-[1500px]:p-8 min-[1500px]:gap-6 font-nunito">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="bg-gray-200/50 rounded-2xl hidden sm:flex "
      >
        <Sidebar />
      </motion.div>
      <div className="flex  grow flex-col  gap-4  ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-200/50 rounded-2xl flex items-center justify-between px-4 py-4"
        >
          <div className="relative hidden sm:block">
            <Input
              placeholder="Search documents..."
              className="bg-white rounded-full border-none shadow-none px-10 py-3"
            />
            <SearchIcon
              //   color="black"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              size={18}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-sm flex gap-1 items-center justify-center text-gray-600 ">
              <MdKeyboardCommandKey size={14} />
              <span className="text-xs ">F</span>
            </div>
          </div>
          <div className="flex gap-4 sm:hidden">
            <MenuIcon size={20} color="#101828" />
            <div className="block sm:hidden text-black">Qlarety</div>
          </div>
          <div className="relative h-full flex gap-4 ">
            <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
              <MailIcon className="" color="#101828" size={20} />
            </div>
            <div className="bg-white p-3 h-full rounded-full bsg-gray-900 aspect-square flex items-center justify-center">
              <BellIcon className="" color="#101828" size={20} />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-200/50 rounded-2xl overflow-scroll h-full "
        >
          <div className="flex overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Document Name Input */}
                {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Name
                  </label>
                  <input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="Enter document name..."
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    The document will be automatically named with the job ID after processing
                  </p>
                </div> */}

                {/* Input Methods Section */}
                <div className="bg-whikte/80 backdrop-blur-sm rousnded-xl px-6 borsder bordejr-gray-200/50 shadjow-sm flex justify-center items-center">
                  {/* <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Document</h2> */}
                  {/* <InputStack /> */}
                  <DocumentInput />
                </div>

                {/* Instructions */}
                <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">How it works</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Upload a file, scan an image, or paste text to analyze</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Click &quot;Process Text&quot; to start the analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Your document will be automatically saved with the job ID</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { documents: allDocuments, deleteDocument } = useDocumentNames();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const docId = useMemo(() => {
    const match = pathname?.match(/\/doc\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  const recentDocuments = useMemo(
    () =>
      allDocuments.slice(0, 10).map((doc) => ({
        id: doc.id,
        name: doc.name,
        date: new Date(doc.updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
    [allDocuments],
  );

  const handleDocumentClick = useCallback(
    (id: string) => {
      setOpenDropdownId(null);
      router.push(`/doc/${id}`);
    },
    [router],
  );

  const toggleDropdown = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDropdownId(null);
      router.push(`/doc/${id}`);
    },
    [router],
  );

  const handleDeleteClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteDocument(id);
      setOpenDropdownId(null);
    },
    [deleteDocument],
  );

  const generalItems = [
    {
      icon: <SettingsIcon size={18} color="#737373" />,
      label: "Settings",
      href: "/settings",
    },
    // {
    //   icon: <SettingsIcon size={18} color="#737373" />,
    //   label: "Help",
    //   href: "/settings",
    // },
    {
      icon: <KeyIcon size={18} color="#737373" />,
      label: "Logout",
      href: "/settings",
    },
  ];
  return (
    <div className="bg-gray-100 rounded-2xl  sm:block min-h-[200px] flex flex-col  relative">
      <div className="flex flex-col py-4 flex-1">
        <div className="text-black font-semibold px-4">Qlarety</div>
        <div className="mt-6 text-neutral-500 font-semibold text-xs px-4">DOCS</div>
        {recentDocuments.length > 0 ? (
          <div className="space-y-2 mt-3  px-4 max-h-[22rem] overflow-scroll">
            {recentDocuments.map((doc) => {
              const isActive = doc.id === docId;
              const isDropdownOpen = openDropdownId === doc.id;
              return (
                <div
                  key={doc.id}
                  className={`relative rounded-xl bordser transition-all duration-200 group ${
                    isActive
                      ? "bg-primary-green/20 border-primary-green/50 hover:bg-primary-green/30"
                      : "bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  {/* <div className="bg-primary-green w-4 h-4" /> */}
                  <button
                    onClick={() => handleDocumentClick(doc.id)}
                    className="w-full text-left p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <div className="w-2 h-2 bg-primary-green rounded-full shrink-0" />
                          )}
                          <p
                            className={`text-sm font-medium truncate transition-colors ${
                              isActive
                                ? "text-primary-green group-hover:text-primary-green"
                                : "text-gray-900 group-hover:text-primary-green"
                            }`}
                          >
                            {doc.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiClock
                            className={isActive ? "text-primary-green/70" : "text-gray-500"}
                            size={12}
                          />
                          <span
                            className={
                              isActive ? "text-primary-green/70 text-xs" : "text-gray-500 text-xs"
                            }
                          >
                            {doc.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiChevronRight
                          className={`shrink-0 mt-0.5 transition-colors ${
                            isActive
                              ? "text-primary-green group-hover:text-primary-green"
                              : "text-gray-500 group-hover:text-primary-green"
                          }`}
                          size={16}
                        />
                        <button
                          type="button"
                          onClick={(e) => toggleDropdown(doc.id, e)}
                          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                            isDropdownOpen ? "bg-gray-200" : ""
                          }`}
                        >
                          <FiMoreVertical
                            className={isActive ? "text-primary-green" : "text-gray-400"}
                            size={16}
                          />
                        </button>
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                      <button
                        type="button"
                        onClick={(e) => handleSelectClick(doc.id, e)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <FiCheck size={14} />
                        <span>Open</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteClick(doc.id, e)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <FiTrash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiFileText className="text-gray-600 mx-auto mb-2" size={32} />
            <p className="text-gray-500 text-sm">No recent documents</p>
          </div>
        )}
      </div>

      <div className="px-4">
        <Button
          variant="primary-green"
          className="text-md w-full bsg-linear-to-b from-[#124F35] to-[#1D734B] text-black font-semibold rounded-full py-3 border-0 hover:opacity-90"
        >
          <PlusIcon color="black" />
          <span>Create New</span>
        </Button>
      </div>
      <div className="absolute bottom-0 w-full mb-4">
        <div className=" text-neutral-500 font-semibold text-xs px-4">GENERAL</div>
        <div className="text-neutral-500 mt-4">
          {generalItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2">
              {item.icon}
              <span className="">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
