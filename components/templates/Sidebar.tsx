"use client";

import { useMemo, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocumentsList, useDeleteDocument } from "@/data/document";
import type { Document } from "@/types/document";
import { BsLayoutSidebar } from "react-icons/bs";
import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
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
import { AddFolderIcon } from "@/assets/svg/AddFolderIcon";
import { AddFolderIcon2 } from "@/assets/svg/AddFolderIcon2";
import { FileIcon } from "@/assets/svg/FileIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { RefreshIcon } from "@/assets/svg/RefreshIcon";
import { LockIcon } from "@/assets/svg/LockIcon";
import { setMobileSidebarOpen } from "@/redux/slices/dashboard/layout.slice";
import { QllaretyLogo } from "@/assets/svg/QllaretyLogo";

const Sidebar = () => {
  useDocumentsList();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const documents = useSelector((state: RootState) => state.documentsList.documents);
  const { mutateAsync: deleteDocument } = useDeleteDocument();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const docId = useMemo(() => {
    const match = pathname?.match(/\/doc\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  // const allDocuments = useMemo(
  //   (): Document[] => (documentsData && documentsData?.data ? documentsData.data : []),
  //   [documentsData],
  // );
  const allDocuments = documents || [];

  const recentDocuments = useMemo(
    () =>
      allDocuments.slice(0, 10).map((doc: Document) => ({
        id: doc.id,
        jobId: doc.jobId,
        name: doc.documentName,
        externalDocId: doc.externalDocId,
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
      dispatch(setMobileSidebarOpen(false));
    },
    [router, dispatch],
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
      deleteDocument(id).finally(() => setOpenDropdownId(null));
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

  const goToCreateNew = () => {
    router.push("/doc/new");
    dispatch(setMobileSidebarOpen(false));
  };

  return (
    <div className=" rounded-2xl  block sm:block min-h-[200px]  flex-col  relative h-full">
      <div className="flex flex-col py-4 flex-1">
        <div className="flex justify-between px-4 items-center">
          <div className="text-black font-semibold ">
            <QllaretyLogo width={80} height={80} />
            {/* Qlarety */}
          </div>
          {/* <button className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer">
            <TbLayoutSidebar size={18} className="text-neutral-600" />
          </button> */}
        </div>
        <div className="mt-6 text-neutral-500 font-semibold text-xs px-4 flex items-center gap-2">
          RECENT DOCUMENTS
          <button type="button">
            <RefreshIcon size={12} color="#737373" />
          </button>
        </div>
        {recentDocuments.length > 0 ? (
          <div className="space-y-2 mt-3  px-4 max-h-[22rem] overflow-scroll">
            {recentDocuments.map((doc) => {
              const isActive = doc.jobId === docId;
              const isDropdownOpen = openDropdownId === doc.id;
              const isExternal = doc.externalDocId;
              return (
                <div
                  key={doc.id}
                  className={`relative rounded-xl border transition-all duration-200 group ${
                    isActive
                      ? "bg-gray-500/10 border-gray-300 hover:bg-gray-600/10"
                      : " border-gray-200 hover:bg-white hover:border-gray-300 bg-gray-300/10"
                  }`}
                >
                  {/* <div className="bg-primary-green w-4 h-4" /> */}
                  <button
                    onClick={() => handleDocumentClick(doc.jobId)}
                    className="w-full text-left p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <div className="w-2 h-2 bg-gray-800 rounded-full shrink-0" />
                          )}
                          <p
                            className={`text-sm font-medium truncate transition-colors ${
                              isActive
                                ? "text-gray-900 group-hover:text-gray-900"
                                : "text-gray-500 group-hover:text-gray-900"
                            }`}
                          >
                            {doc.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <FiClock
                            className={isActive ? " text-gray-500" : "text-gray-500"}
                            size={12}
                          />
                          <span
                            className={isActive ? "text-gray-500 text-xs" : "text-gray-500 text-xs"}
                          >
                            {doc.date}
                          </span>
                          {isExternal && (
                            <span className="rounded-full border flex gap-1 items-center px-2 py-1 text-xs text-gray-500">
                              <LockIcon size={12} color="#737373" />
                              <span>External</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiChevronRight
                          className={`shrink-0 mt-0.5 transition-colors ${
                            isActive
                              ? "text-gray-400 group-hover:text-gray-400"
                              : "text-gray-500 group-hover:text-gray-400"
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
                            className={isActive ? "text-gray-500" : "text-gray-400"}
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
            <FileIcon className="text-gray-600 mx-auto mb-2" size={25} color="#6a7282" />
            <p className="text-gray-500 text-sm">No recent documents</p>
          </div>
        )}
      </div>

      <div className="px-4">
        <Button
          onClick={goToCreateNew}
          variant="primary-green"
          className="bg-green-600  text-sm w-full  text-white font-bold shsadow-2xl shadsow-black/50 shadow-none rounded-full py-3 border-0 hover:opacity-90"
        >
          <AddFolderIcon2 color="white" size={20} />
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

export default Sidebar;
