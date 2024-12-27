import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProps } from "./Publicacao";

interface UsersStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
  token?: string;
}

const useUsersStore = create(
  persist<UsersStore>(
    (set) => ({
      user: {
        username: "",
        ultimo_login: new Date(),
      },

      setUser: (userData: UserProps) => {
        set({ user: userData });
      },
    }),
    {
      name: "Armazém de usuários",
    }
  )
);

export const getToken = () => useUsersStore.getState().token;

export const setToken = (newToken: string): void => {
  useUsersStore.setState((prev) => {
    return {
      ...prev,
      token: newToken,
    };
  });
};

export default useUsersStore;
