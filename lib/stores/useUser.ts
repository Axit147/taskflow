import { users } from "@/db/schema";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export interface userStore {
  user: typeof users.$inferInsert | null;
  updateUserToken: (token: string) => void;
  fetchUser: () => void;
  removeUser: () => void;
}

export const useUser = create<userStore>((set) => ({
  user: null,
  updateUserToken: (token) => {
    Cookies.set("token", token, { expires: 1 });
    return set({ user: jwtDecode(token) });
  },
  fetchUser: () => {
    if (typeof window !== "undefined") {
      const storedToken = Cookies.get("token");
      set({ user: storedToken ? jwtDecode(storedToken) : null });
    }
  },
  removeUser: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("token");
    }
    set({ user: null });
  },
}));
