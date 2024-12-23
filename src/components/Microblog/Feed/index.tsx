import { useEffect, useState } from "react";
import axiosRequestor from "../axiosRequestor";
import FormularioPublicacao from "../FormularioPublicacao";
import Header from "../Header";
import { PublicacaoProps } from "../Publicacao";

export default function Feed() {
  const [pubs, setPubs] = useState<PublicacaoProps[]>([]);
  const publicacoes = async (): Promise<void> => {
    return await axiosRequestor.get("publicacao/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    const publics = publicacoes();
    setPubs(publics.results);
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="container m-1 mr-6">
          <FormularioPublicacao />
        </div>
        <div className="container ml-6 p-0">
          <Publicacao
            data={new Date().toLocaleDateString()}
            titulo="Olá, bem vindo ao nosso blog!!"
            descricao="Aqui você poderá criar a sua conta, publicar o que você quiser, ver as publicações dos seus amigos, 
                        e comentar nas publicações que você quiser! Tudo isso por um valor generoso de um sorriso por publicação feita, 
                        e um elogio por comentário postado, só há benefícios no nosso blog!!!!!!"
            imagem="../images/Microblog.png"
          />
          {pubs.map((pub) => (
            <Publicacao
              userPub={pub.userPub}
              data={pub.data}
              titulo={pub.titulo}
              descricao={pub.descricao}
              imagem={pub.imagem}
            />
          ))}
        </div>
      </div>
    </>
  );
}
