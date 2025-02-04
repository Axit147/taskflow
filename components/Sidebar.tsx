"use client";

import React, { useEffect, useState } from "react";
import {
  CheckSquare,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  Star,
  PieChart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useRouter, usePathname } from "next/navigation";
import { userStore, useUser } from "@/lib/stores/useUser";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const currentPath = usePathname();
  const [activePath, setActivePath] = useState<string | null>(currentPath);
  const router = useRouter();

  const user = useUser((state: userStore) => state.user);
  const fetchUser = useUser((state: userStore) => state.fetchUser);
  const removeUser = useUser((state: userStore) => state.removeUser);

  const navigation = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Tasks", path: "/tasks", icon: <CheckSquare /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar /> },
    { name: "Teams", path: null, icon: <Users /> },
    { name: "Reports", path: null, icon: <PieChart /> },
    { name: "Favorites", path: null, icon: <Star /> },
    { name: "Settings", path: "/settings", icon: <Settings /> },
  ];

  const handleNavigation = (path: string | null) => {
    if (path) {
      setActivePath(path);
      // Add your navigation logic here
      router.push(path);
    } else {
      toast("Feature Coming Soon...", { icon: "⏳" });
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    removeUser();
    router.replace("/auth/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "w-64" : "w-16"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-2.5 border-b border-gray-200 dark:border-gray-700">
          {isExpanded && (
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              TaskFlow
            </span>
          )}
          <div className="flex items-center gap-2">
            {isExpanded && <ThemeToggle />}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {isExpanded ? <X size={20} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 ${
                    activePath?.includes(item.path!)
                      ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span className="inline-flex items-center justify-center">
                    <span
                      className={`w-5 h-6 pl-0.5 ${
                        activePath === item.path
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </span>
                  {isExpanded && (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* <LogOutBtn /> */}
        <button
          onClick={logOut}
          className="bg-red-600 hover:bg-red-500 text-white flex items-center p-3 duration-200 rounded-md m-2 gap-2"
        >
          <LogOut className="shrink-0" />{" "}
          {isExpanded && <span className="shrink">Log Out</span>}
        </button>
        {/* User Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Users size={16} className="text-gray-600" />
            </div>
            {isExpanded && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.firstName || "John" + " " + user?.lastName || "Doe"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
