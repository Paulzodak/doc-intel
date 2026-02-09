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
import TestDashboard from "@/testdashboard";

export default function TestDashboardPage() {
  const { generateUniqueName } = useDocumentNames();

  // Initialize document name only once
  const [documentName, setDocumentName] = useState(() => generateUniqueName());

  return <TestDashboard />;
}
