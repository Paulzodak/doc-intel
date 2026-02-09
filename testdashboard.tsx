"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Mail,
  Bell,
  Plus,
  Database,
  Video,
  TrendingUp,
  Info,
  Pause,
  Square,
} from "lucide-react";

export default function TestDashboard() {
  const [selectedNav, setSelectedNav] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, active: true },
    { id: "Tasks", icon: CheckSquare, badge: "12+" },
    { id: "Calendar", icon: Calendar },
    { id: "Analytics", icon: BarChart3 },
    { id: "Team", icon: Users },
  ];

  const generalItems = [
    { id: "Settings", icon: Settings },
    { id: "Help", icon: HelpCircle },
    { id: "Logout", icon: LogOut },
  ];

  return (
    <div className="flex h-screen w-screen bg-gray-50 font-nunito">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[280px] bg-[#F5F5F5] flex flex-col border-r border-gray-200"
      >
        {/* Logo */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Donezo</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          {/* MENU Section */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-3">
              MENU
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === selectedNav;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedNav(item.id)}
                    className={`relative w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981] rounded-r" />
                    )}
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-[#10B981]" : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`flex-1 text-left ${
                        isActive ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {item.id}
                    </span>
                    {item.badge && (
                      <span className="bg-[#10B981] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GENERAL Section */}
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-3">
              GENERAL
            </h3>
            <div className="space-y-1">
              {generalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="flex-1 text-left">{item.id}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile App Promo */}
        <div className="p-6">
          <div className="bg-[#065F46] rounded-xl p-6 space-y-4">
            <h4 className="text-white font-semibold text-base">
              Download our Mobile App
            </h4>
            <p className="text-gray-300 text-sm">
              Get easy in another way!
            </p>
            <Button
              className="w-full bg-[#10B981] hover:bg-[#0ea271] text-white font-medium rounded-lg"
            >
              Download
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
        >
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search task"
              className="pl-10 pr-12 rounded-full border-gray-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
              F
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                Totok Michael
              </span>
              <span className="text-xs text-gray-500">
                tmichael00@mail.com
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Title Section */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Plan, prioritize, and accomplish your tasks with ease.
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-[#10B981] hover:bg-[#0ea271] text-white">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
                <Button className="bg-[#10B981] hover:bg-[#0ea271] text-white">
                  <Database className="w-4 h-4" />
                  Import Data
                </Button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-4 gap-4">
              {/* Total Projects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-[#10B981] p-6">
                  <p className="text-white text-sm mb-2">Total Projects</p>
                  <p className="text-white text-4xl font-bold">24</p>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Increased from last month
                  </span>
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                </div>
              </div>

              {/* Ended Projects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">Ended Projects</p>
                  <p className="text-gray-900 text-4xl font-bold">10</p>
                </div>
                <div className="p-6 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Increased from last month
                  </span>
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                </div>
              </div>

              {/* Running Projects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">Running Projects</p>
                  <p className="text-gray-900 text-4xl font-bold">12</p>
                </div>
                <div className="p-6 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Increased from last month
                  </span>
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                </div>
              </div>

              {/* Pending Project */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">Pending Project</p>
                  <p className="text-gray-900 text-4xl font-bold">2</p>
                </div>
                <div className="p-6 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs text-gray-500">On Discuss</span>
                  <Info className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Project Analytics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project Analytics
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-end justify-between gap-2 h-32 mb-4">
                    {[60, 80, 100, 70, 90, 50, 85].map((height, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t ${
                          idx % 3 === 0 || idx === 1 || idx === 6
                            ? "bg-[#10B981]"
                            : "bg-gray-300"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reminders
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-gray-900 font-medium">
                      Meeting with Arc Company
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      02.00 pm - 04.00 pm
                    </p>
                  </div>
                  <Button className="w-full bg-[#10B981] hover:bg-[#0ea271] text-white">
                    <Video className="w-4 h-4" />
                    Start Meeting
                  </Button>
                </div>
              </div>

              {/* Project List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project
                  </h3>
                  <Button
                    size="sm"
                    className="bg-[#10B981] hover:bg-[#0ea271] text-white h-8"
                  >
                    <Plus className="w-3 h-3" />
                    New
                  </Button>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { name: "Lightning Bolt", color: "#3B82F6" },
                    { name: "Ocean Waves", color: "#14B8A6" },
                    { name: "Purple Cube", color: "#8B5CF6" },
                    { name: "Orange Circle", color: "#F59E0B" },
                    { name: "Dark Purple Cross", color: "#6366F1" },
                  ].map((project, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 py-2"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="flex-1 text-sm text-gray-900">
                        {project.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Due date Nov 30, 2024
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Team Collaboration */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Team Collaboration
                  </h3>
                  <Button
                    size="sm"
                    className="bg-[#10B981] hover:bg-[#0ea271] text-white h-8"
                  >
                    <Plus className="w-3 h-3" />
                    Add Member
                  </Button>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      name: "John Doe",
                      task: "Working on Github Project Repository",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-700",
                    },
                    {
                      name: "Jane Smith",
                      task: "Integrate User Authentication System",
                      status: "In-Progress",
                      statusColor: "bg-yellow-100 text-yellow-700",
                    },
                    {
                      name: "Bob Johnson",
                      task: "Develop Search and Filter Functionality",
                      status: "In-Progress",
                      statusColor: "bg-yellow-100 text-yellow-700",
                    },
                    {
                      name: "Alice Brown",
                      task: "Responsive Layout for Homepage",
                      status: "Pending",
                      statusColor: "bg-red-100 text-red-700",
                    },
                  ].map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {member.task}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${member.statusColor}`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project Progress
                  </h3>
                </div>
                <div className="p-6 flex flex-col items-center space-y-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#10B981"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56 * 0.41} ${2 * Math.PI * 56}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">41%</span>
                      <span className="text-xs text-gray-500">Project Ended</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10B981] rounded-full" />
                      <span className="text-xs text-gray-500">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-xs text-gray-500">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Tracker */}
              <div className="bg-[#10B981] rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#0ea271]">
                  <h3 className="text-lg font-semibold text-white">
                    Time Tracker
                  </h3>
                </div>
                <div className="p-6 flex flex-col items-center space-y-6">
                  <div className="text-5xl font-bold text-white">01:24:08</div>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Pause className="w-6 h-6 text-[#10B981]" />
                    </button>
                    <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Square className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
