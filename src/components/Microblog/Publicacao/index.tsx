import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosRequestor from "../axiosRequestor";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Comentario, { ComentarioProps } from "../Comentario";

export interface PublicacaoProps {
  id: number;
  autor: UserProps;
  publicado_em: string;
  titulo: string;
  descricao: string;
  imagem?: string;
}

export interface UserProps {
  id?: number;
  username: string;
  nome?: string;
  ultimo_login: Date;
}

export interface ComentarioFormProps {
  publicacao?: number;
  mensagem: string;
}

export default function Publicacao(props: PublicacaoProps): JSX.Element {
  const schema = yup.object().shape({
    mensagem: yup
      .string()
      .required("Escreva seu comentário para podermos enviá-lo")
      .max(400, "Este campo excedeu o limite de caracteres"),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id, autor, publicado_em, descricao, imagem, titulo } = props;
  const data_publicacao = new Date(publicado_em);
  const dia = data_publicacao.getDate().toString().padStart(2, "0");
  const mes = (data_publicacao.getMonth() + 1).toString().padStart(2, "0");
  const ano = data_publicacao.getFullYear().toString();
  const [error, setError] = useState<string>("");
  const [comentarios, setComentarios] = useState<boolean>(false);
  const [novoComentario, setNovoComentario] = useState<boolean>(false);
  const [listaComentarios, setListaComentarios] = useState<ComentarioProps[]>(
    []
  );
  const navigate: NavigateFunction = useNavigate();

  async function submitComment(data: ComentarioFormProps) {
    const comentario: ComentarioFormProps = {
      publicacao: id,
      mensagem: data.mensagem,
    };
    await axiosRequestor
      .post("comentario/", comentario, {
        headers: {
          "Content-Type": "application/json",
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
              break;
          }
        }
      });
    setNovoComentario(!novoComentario);
    reset();
  }
  const fetchComentarios = async (): Promise<void> => {
    const comentarios = await axiosRequestor
      .get(`publicacao/${id}/comentarios/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data.results);
    setListaComentarios(comentarios);
  };

  useEffect(() => {
    fetchComentarios();
  }, []);
  useEffect(() => {
    fetchComentarios();
  }, [novoComentario]);

  return (
    <div className="col-12">
      <div className="br-card mr-6">
        <div className="card-header">
          <div className="ml-3 d-flex text-center justify-content-end">
            <div className="text-weight-semi-bold text-up-02">
              {autor.username}
            </div>
            <div className="ml-auto">
              <div>
                {dia}/{mes}/{ano}
              </div>
            </div>
          </div>
          <h6 className="text-left ml-3">{titulo}</h6>
          <span className="br-divider light-mode my-3"></span>
        </div>
        <div
          className={`card-content text-left ${imagem && "d-flex"}`}
          tabIndex={0}
        >
          <p className="mr-3">{descricao}</p>
          {imagem && (
            <img src={imagem} alt="imagem-pub" width={200} height={200} />
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="br-button mx-3 my-1"
            onClick={() => {
              setComentarios(!comentarios);
            }}
          >
            {comentarios ? (
              <span>
                <i className="fas fa-eye-slash" aria-hidden="true"></i>Ocultar
                comentários
              </span>
            ) : (
              <span>
                <i className="fas fa-eye" aria-hidden="true"></i>Ver comentários
              </span>
            )}
          </button>
        </div>
        <span className="br-divider light-mode mb-3 mx-3"></span>
        <form onSubmit={handleSubmit(submitComment)}>
          <div className="flex-column text-left">
            <div className="col-12">
              <div className="br-input mx-3">
                <input
                  id="input-default"
                  type="text"
                  placeholder="Ex.: Adorei esta publicação..."
                  {...register("mensagem")}
                />
              </div>
              {errors.mensagem?.message && (
                <span className="feedback danger mx-3" role="alert" id="danger">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {errors.mensagem?.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <button className="br-button m-3 secondary" type="submit">
              <i className="fas fa-share" aria-hidden="true"></i>
              Comentar
            </button>
            {error && (
              <span className="feedback danger mx-3" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {error}
              </span>
            )}
          </div>
        </form>
        {comentarios && (
          <>
            <span className="br-divider light-mode mb-3 mx-3"></span>
            <div className="card-footer d-flex flex-column">
              <div className="d-flex overflow-auto flex-column">
                {listaComentarios.map(
                  (comentario: ComentarioProps, index: number) => (
                    <Comentario
                      key={index}
                      autor={comentario.autor}
                      publicado_em={comentario.publicado_em}
                      mensagem={comentario.mensagem}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
