import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsersStore {
  user: UserProps;
  setUser: (user: UserProps) => void;
  token?: string;
}

export interface UserProps {
  id?: number;
  username: string;
  nome?: string;
  ultimo_login: Date;
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
