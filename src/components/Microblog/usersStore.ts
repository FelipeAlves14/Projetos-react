import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProps } from "./Cadastro";
import { PublicacaoProps } from "./Publicacao";

interface UsersStore {
  users: UserProps[];
  user: UserProps;
  pubs: PublicacaoProps[];
  addUser: (user: UserProps) => void;
  setUser: (user: UserProps) => void;
  addPubs: (pub: PublicacaoProps) => void;
  token?: string;
}

const useUsersStore = create(
  persist<UsersStore>(
    (set, get) => ({
      users: [],
      pubs: [],
      user: {
        username: "",
        nome: "",
        senha: "",
        confirmSenha: "",
      },

      addUser: (userForm: UserProps) => {
        const listUsers: UserProps[] = get().users;
        listUsers.push(userForm);
        set({ users: listUsers });
      },

      setUser: (userForm: UserProps) => {
        set({ user: userForm });
      },

      addPubs: (pub: PublicacaoProps) => {
        const listPubs: PublicacaoProps[] = get().pubs;
        const publicacao: PublicacaoProps = {
          userPub: get().user,
          data: new Date().toLocaleDateString(),
          titulo: pub.titulo,
          descricao: pub.descricao,
          imagem: pub.imagem ?? "",
        };
        listPubs.push(publicacao);
        listPubs.sort((pub1: PublicacaoProps, pub2: PublicacaoProps) => {
          let ordem: number = 0;
          if ((pub1.data as string) > (pub2.data as string)) ordem = 1;
          else if ((pub1.data as string) < (pub2.data as string)) ordem = -1;
          return ordem;
        });
        set({ pubs: listPubs });
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
