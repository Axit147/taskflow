"use client";

import Sidebar from "@/components/Sidebar";
import { getTasks } from "@/lib/queries/getTasks";
import { taskStore, useTasks } from "@/lib/stores/useTasks";
import { userStore, useUser } from "@/lib/stores/useUser";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setTasks = useTasks((state: taskStore) => state.updateTasks);
  const setIsPending = useTasks((state: taskStore) => state.setPendingState);
  const user = useUser((state: userStore) => state.user);
  const fetchUser = useUser((state: userStore) => state.fetchUser);

  const { data, isPending } = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: () => getTasks(user?.id!),
    enabled: () => (user?.id !== undefined || null) as boolean,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex w-full h-screen" suppressHydrationWarning>
      <Sidebar />
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}
