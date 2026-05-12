"use client";

import { useMemo, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocumentsList, useDeleteDocument, useArchiveDocument } from "@/data/document";
import { useGetSession, useLogout } from "@/data/auth";
import type { Document, ISidebarDoc } from "@/types/document";
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
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { SpinnerLoader } from "../ui/SpinnerLoader";
import { FileIconFilled } from "@/assets/svg/FileIconFilled";
import { FileIcon2 } from "@/assets/svg/FileIcon2";
import { FileIcon2Filled } from "@/assets/svg/FileIcon2Filled";
import { ToastLogger } from "@/utils/toastUtils";
import { TrashIcon } from "@/assets/svg/TrashIcon";
import { OpenIcon } from "@/assets/svg/OpenIcon";
import { EyeIconFilled } from "@/assets/svg/EyeIconFilled";
import { EyeIcon } from "@/assets/svg/EyeIcon";
import { MetaInfoModal } from "../doc/MetaInfoModal";
import Dialog from "../atoms/Dialog";
import { motion } from "framer-motion";
import { setShowSetting } from "@/redux/slices/settings/settings.slice";
import { selectUser } from "@/redux/slices/user/user.slice";
import { BagIcon } from "@/assets/svg/BagIcon";

const Sidebar = () => {
  const { refetch, isRefetching } = useDocumentsList();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const documents = useSelector((state: RootState) => state.documentsList.documents);
  const { mutateAsync: deleteDocument } = useDeleteDocument();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const user = useSelector(selectUser);
  const { data: sessionData } = useGetSession();
  const isSignedIn = sessionData?.user;

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  // const allDocuments = useMemo(
  //   (): Document[] => (documentsData && documentsData?.data ? documentsData.data : []),
  //   [documentsData],
  // );
  const allDocuments = documents || [];

  const recentDocuments: ISidebarDoc[] = useMemo(
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

  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/");
        dispatch(setMobileSidebarOpen(false));
      },
      onError: (error) => {
        const message =
          error.response?.data?.message ??
          (error.response?.data as { status?: string })?.status ??
          error.message ??
          "Failed to log out";
        ToastLogger.error("auth", message);
      },
    });
  }, [logout, router, dispatch]);

  const handleOpenSettings = () => {
    dispatch(setShowSetting(true));
  };
  const generalItems: {
    icon: ReactNode;
    label: string;
    href?: string;
    action?: () => void;
    loading?: boolean;
  }[] = [
    {
      icon: <SettingsIcon size={18} color="#737373" />,
      label: "Settings",
      href: "/settings",
      action: handleOpenSettings,
    },
    {
      icon: <KeyIcon size={18} color="#737373" />,
      label: "Logout",
      action: handleLogout,
      loading: isLoggingOut,
    },
  ];

  const goToCreateNew = () => {
    router.push("/doc/new");
    dispatch(setMobileSidebarOpen(false));
  };

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <div className=" rounded-2xl relative  block sm:block min-h-[200px] sm:w-[18rem]  flex-col  relative h-full">
      <div className="flex flex-col py-4 flex-1">
        <div className="flex justify-between px-4 items-center">
          <div className="text-black font-semibold ">
            <QlaretyLogo width={80} height={80} />
            {/* Qlarety */}
          </div>
          {/* <button className="hover:bg-neutral-200/50 p-2 rounded-sm cursor-pointer">
            <TbLayoutSidebar size={18} className="text-neutral-600" />
          </button> */}
        </div>
        <div className="mt-6 text-neutral-500 font-semibold text-xs px-4 flex items-center gap-2">
          RECENT DOCUMENTS
          <button
            className="flex items-center cursor-pointer"
            onClick={() => refetch()}
            type="button"
          >
            {isRefetching ? (
              <SpinnerLoader size="sm" color="#737373" className="my-auto" />
            ) : (
              <RefreshIcon size={12} color="#737373" />
            )}
          </button>
        </div>
        {recentDocuments.length > 0 ? (
          <div className="space-y-2 mt-3  px-4 max-h-[22rem] overflow-scroll">
            {recentDocuments.map((doc) => {
              return <DocItem key={doc.id} doc={doc} />;
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
          // variant="primary-green"
          // className="bg-primary-green w-full text-legal-navy px-4 py-2 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
          // className="bg-green-600 shadow-lg shadow-green-800/30  text-sm w-full  text-white font-bold rounded-full py-3 border-0 hover:opacity-90"
        >
          <AddFolderIcon color="white" size={20} />
          <span className="text-white">Create New</span>
        </Button>
      </div>
      {user && (
        <div className="absolute bottom-0 w-full mb-4">
          <div className=" text-neutral-500 font-semibold text-xs px-4">GENERAL</div>
          <div className="text-neutral-500 mt-4">
            {generalItems.map((item, i) => (
              <div key={i} className="px-4 py-2 text-sm">
                <button
                  type="button"
                  onClick={item.action}
                  // onClick={handleLogout}
                  // disabled={isLoggingOut}
                  className="flex cursor-pointer items-center gap-2 text-neutral-500 w-full text-left disabled:opacity-70"
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.loading && (
                    <SpinnerLoader size="sm" color="text-neutral-500" className="shrink-0" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {!user && (
        <div className="absolute bottom-0 w-full mb-4 px-4">
          <Button
            onClick={handleLogin}
            variant="primary-green"
            className="w-full rounded-full shadow-none text-sm"
          >
            <LockIcon size={16} color="#fff" />
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

const DocItem = ({ doc }: { doc: ISidebarDoc }) => {
  const pathname = usePathname();
  const docId = useMemo(() => {
    const match = pathname?.match(/\/doc\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);
  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocument();
  const { mutate: archiveDocument, isPending: isArchiving } = useArchiveDocument();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const isActive = doc.jobId === docId;
  const isDropdownOpen = openDropdown?.id === doc.id;
  const isExternal = doc.externalDocId;
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleDocumentClick = useCallback(
    (id: string) => {
      setOpenDropdown(null);
      router.push(`/doc/${id}`);
      dispatch(setMobileSidebarOpen(false));
    },
    [router, dispatch],
  );

  const toggleDropdown = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown((prev) => {
      if (prev?.id === id) return null;
      return { id, x: e.clientX, y: e.clientY };
    });
  }, []);

  const handleSelectClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenDropdown(null);
      router.push(`/doc/${id}`);
    },
    [router],
  );

  const handleDeleteClick = (id: string) => {
    deleteDocument(id, {
      onSuccess: () => {
        setShowDelete(false);
      },
      onError: (error) => {
        ToastLogger.error("documents", "Failed to delete document");
      },
    });
  };
  const handleArchiveClick = (id: string) => {
    archiveDocument(id, {
      onSuccess: () => {
        setShowArchive(false);
        router.push("/doc/new");
      },
      onError: (error) => {
        ToastLogger.error("documents", "Failed to archive document");
      },
    });
  };

  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!itemRef.current) return;
      if (!itemRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);
  return (
    <div
      ref={itemRef}
      key={doc.id}
      className={` rounded-xl border transition-all duration-200 group ${
        isActive
          ? "bg-gray-500/10 border-gray-300 hover:bg-gray-600/10"
          : " border-gray-200/50 hover:bg-white hover:border-gray-300 bg-gray-300/10"
      }`}
    >
      {/* <div className="bg-primary-green w-4 h-4" /> */}
      <button onClick={() => handleDocumentClick(doc.jobId)} className="w-full text-left p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <FileIcon2Filled
                className="text-gray-600"
                color={isActive ? "#4a5565 " : "#99a1af"}
                size={16}
              />
              {/* {isActive && (
            <div className="w-2 h-2 bg-gray-800 rounded-full shrink-0" />
          )} */}
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
              <FiClock className={isActive ? " text-gray-600" : "text-gray-400"} size={12} />
              <span className={isActive ? "text-gray-500 text-xs" : "text-gray-400 text-xs"}>
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
            {/* <FiChevronRight
          className={`shrink-0 mt-0.5 transition-colors ${
            isActive
              ? "text-gray-400 group-hover:text-gray-400"
              : "text-gray-500 group-hover:text-gray-400"
          }`}
          size={16}
        /> */}
            <button
              type="button"
              onClick={(e) => toggleDropdown(doc.id, e)}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isDropdownOpen ? "bg-gray-200" : ""
              }`}
            >
              <FiMoreVertical className={isActive ? "text-gray-500" : "text-gray-400"} size={16} />
            </button>
          </div>
        </div>
      </button>

      <MetaInfoModal
        isOpen={showMetaInfo}
        onClose={() => setShowMetaInfo(false)}
        jobId={doc.jobId}
      />
      {isDropdownOpen && openDropdown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-30 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden min-w-[140px]"
          style={{ left: openDropdown.x, top: openDropdown.y + 4 }}
        >
          <button
            type="button"
            onClick={(e) => handleSelectClick(doc.jobId, e)}
            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <OpenIcon size={14} />
            <span>Open</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              setShowMetaInfo(true);
              handleSelectClick(doc.jobId, e);
            }}
            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <EyeIcon size={14} />
            <span>View meta info</span>
          </button>
          <hr />
          <button
            type="button"
            onClick={(e) => {
              setShowArchive(true);
            }}
            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <BagIcon size={14} color={"oklch(57.7% 0.245 27.325)"} />
            <span>Archive</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              setShowDelete(true);
            }}
            className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <TrashIcon size={14} color={"oklch(57.7% 0.245 27.325)"} />
            <span>Delete</span>
          </button>
          <Dialog
            isOpen={showArchive}
            onClose={() => setShowArchive(false)}
            title="Archive Document"
            message="Are you sure you want to archive this document?"
            primaryButton={{
              onClick: () => handleArchiveClick(doc.jobId),
              children: isArchiving ? (
                <SpinnerLoader size="sm" color="#737373" className="shrink-0" />
              ) : (
                "Archive"
              ),
            }}
            secondaryButton={{
              onClick: () => setShowArchive(false),
              children: "Cancel",
            }}
            className="w-full max-w-md"
            variant="danger"
          />
          <Dialog
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            title="Delete Document"
            message={deleteMessage}
            primaryButton={{
              onClick: () => handleDeleteClick(doc.jobId),
              children: isDeleting ? (
                <SpinnerLoader size="sm" color="#737373" className="shrink-0" />
              ) : (
                "Delete"
              ),
            }}
            secondaryButton={{
              onClick: () => setShowDelete(false),
              children: "Cancel",
            }}
            className="w-full max-w-md"
            variant="danger"
          />
        </motion.div>
      )}
      {/* Dropdown Menu */}
    </div>
  );
};

const deleteMessage = (
  <p>
    Are you sure you want to permanently delete this document?
    <b> THIS WILL PERMANENTLY DELETE THE DOCUMENT AND IT CANNOT BE RECOVERED.</b>
  </p>
);
