import { useEffect, useState } from "react";
import axiosRequestor from "../axiosRequestor";
import FormularioPublicacao from "../FormularioPublicacao";
import Header from "../Header";
import Publicacao from "../Publicacao";
import { PublicacaoProps } from "../Publicacao";

export default function Feed() {
  const [pubs, setPubs] = useState<PublicacaoProps[]>([]);
  const fetchPublicacoes = async () => {
    const publicacoes = await axiosRequestor
      .get("publicacao/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data.results);
    setPubs(publicacoes);
  };
  useEffect(() => {
    fetchPublicacoes();
  }, [setPubs]);
  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="container m-1 mr-6">
          <FormularioPublicacao />
        </div>
        <div className="container p-0">
          {pubs.length !== 0 ? (
            pubs.map((pub) => (
              <Publicacao
                id={pub.id}
                autor={pub.autor}
                publicado_em={pub.publicado_em.substring(0, 10)}
                titulo={pub.titulo}
                descricao={pub.descricao}
                imagem={pub.imagem}
              />
            ))
          ) : (
            <h1 className="text-center mt-6">
              Ainda não há publicações, seja a primeira pessoa a publicar
              conosco!
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
