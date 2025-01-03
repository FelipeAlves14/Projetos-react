import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosRequestor from "../axiosRequestor";
import { useEffect, useState } from "react";
import Header from "../Header";
import Publicacao, { PublicacaoProps } from "../Publicacao";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

export interface PublicacaoFormProps {
  titulo: string;
  descricao: string;
  imagem?: File;
}

export default function Feed(): JSX.Element {
  const [pubs, setPubs] = useState<PublicacaoProps[]>([]);
  const [novaPub, setNovaPub] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [errorPagination, setErrorPagination] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const schema = yup.object().shape({
    titulo: yup
      .string()
      .required("Preencha todos os campos obrigatórios")
      .max(200, "Este campo excedeu o limite de caracteres"),
    descricao: yup
      .string()
      .required("Preencha todos os campos obrigatórios")
      .max(1200, "Este campo excedeu o limite de caracteres"),
    imagem: yup.mixed<File>(),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function submitPub(pub: PublicacaoFormProps): Promise<void> {
    const data: PublicacaoFormProps = {
      titulo: pub.titulo,
      descricao: pub.descricao,
      imagem: pub.imagem[0] ?? "",
    };

    await axiosRequestor
      .post("publicacao/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          switch (err.response.status) {
            case 401:
              navigate("/Microblog/login");
              break;
            case 500:
              setError(
                "Ocorreu um erro no servidor, por favor tente novamente mais tarde."
              );
              setTimeout(() => {
                navigate("/Microblog/cadastro");
              }, 2000);
              break;
          }
        }
      });

    reset();
    setNovaPub(!novaPub);
  }

  const fetchPublicacoes = async (): Promise<void> => {
    await axiosRequestor
      .get(`publicacao/?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => setPubs(response.data.results))
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404) {
          setErrorPagination("Não há mais publicações para serem exibidas.");
          setPage(page - 1);
          return;
        }
      });
  };

  useEffect(() => {
    fetchPublicacoes();
  }, []);
  useEffect(() => {
    fetchPublicacoes();
  }, [novaPub, page]);

  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="container m-1 mr-6 d-flex flex-column">
          <form
            className="col-4 shadow-sm pt-3"
            style={{ position: "fixed" }}
            onSubmit={handleSubmit(submitPub)}
            encType="multipart/form-data"
          >
            <div className="text-weight-semi-bold col-10 text-center ml-5 mb-3 text-up-03">
              Faça uma publicação
            </div>
            <div className="col-10 mb-3 ml-4">
              <div className="text-left pl-4 br-input">
                <label htmlFor="input-default">Título</label>
                <input
                  id="input-default"
                  type="text"
                  placeholder="Ex.: Microblog da PNP"
                  {...register("titulo")}
                />
                {errors.titulo?.message && (
                  <span className="feedback danger" role="alert" id="danger">
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    {errors.titulo?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="text-left col-10 pl-4 mb-3 ml-4 br-textarea">
              <label htmlFor="textarea-id1">Descrição</label>
              <textarea
                id="textarea-id1"
                placeholder="Ex.: Muito bom o Microblog..."
                {...register("descricao")}
              ></textarea>
              {errors.descricao?.message && (
                <span className="feedback danger" role="alert" id="danger">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {errors.descricao?.message}
                </span>
              )}
            </div>
            <div className="text-left mb-3 ml-4 pl-4">
              <label className="upload-label" htmlFor="multiple-files">
                <span>Envio de arquivos </span>
              </label>
              <input
                className="upload-input"
                id="imagem"
                type="file"
                accept="image/*"
                aria-hidden={false}
                aria-label="enviar arquivo"
                {...register("imagem")}
              />
              <div className="upload-list mb-5"></div>
            </div>
            <div className="text-right mr-6">
              <button className="br-button primary mr-6 mb-4" type="submit">
                <i className="fas fa-share" aria-hidden="true"></i>
                Publicar
              </button>
              {error && (
                <span className="feedback danger mr-6" role="alert" id="danger">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {error}
                </span>
              )}
            </div>
            <div
              className="col-4 shadow-sm text-right p-3 mt-3"
              style={{ position: "fixed" }}
            >
              <div className="m-3 text-left">
                <h3>Quer descobrir em que foi inspirado o nosso microblog?</h3>
                <h3 className="mb-6 text-left">
                  E nossos padrões de design, tem curiosidade?
                </h3>
              </div>
              <div className="br-magic-button mr-6">
                <Link
                  to="https://www.gov.br/ds/home"
                  target="blank"
                  className="br-button"
                  type="button"
                >
                  <i className="fas fa-search" aria-hidden="true"></i>
                  Descubra aqui
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-1 p-0">
          {pubs.length !== 0 ? (
            <div className="mt-1 p-0">
              {pubs.map((pub, index) => (
                <Publicacao
                  key={index}
                  id={pub.id}
                  autor={pub.autor}
                  publicado_em={pub.publicado_em.substring(0, 10)}
                  titulo={pub.titulo}
                  descricao={pub.descricao}
                  imagem={pub.imagem}
                />
              ))}
              <button
                className="br-button mb-3"
                onClick={() => setPage(page + 1)}
              >
                <i className="fas fa-arrow-down"></i>Ver mais
              </button>
              {errorPagination && (
                <div className="br-message info">
                  <div className="icon">
                    <i
                      className="fas fa-info-circle fa-lg"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div
                    className="content"
                    aria-label={errorPagination}
                    role="alert"
                  >
                    <span className="message-body">{errorPagination}</span>
                  </div>
                  <div className="close">
                    <button
                      className="br-button circle small"
                      type="button"
                      aria-label="Fechar a messagem alterta"
                      onClick={() => setErrorPagination("")}
                    >
                      <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
