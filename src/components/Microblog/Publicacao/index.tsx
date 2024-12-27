import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosRequestor from "../axiosRequestor";
import { NavigateFunction, useNavigate } from "react-router-dom";

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
}

export interface ComentarioFormProps {
  publicacao?: number;
  mensagem: string;
}

export interface ComentarioProps {
  id: number;
  autor: UserProps;
  publicacao: number;
  mensagem: string;
  publicado_em: string;
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
  const [comentarios, setComentarios] = useState<boolean>(false);
  const [listaComentarios, setListaComentarios] = useState<ComentarioProps[]>(
    []
  );
  const navigate: NavigateFunction = useNavigate();

  async function submitComment(data: ComentarioFormProps) {
    try {
      const comentario: ComentarioFormProps = {
        publicacao: id,
        mensagem: data.mensagem,
      };
      await axiosRequestor.post("comentario/", comentario, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      navigate("/Microblog/login");
    }
    reset();
  }

  useEffect(() => {
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
    fetchComentarios();
  }, []);

  return (
    <div className="col-10 p-0">
      <div className="br-card">
        <div className="card-header">
          <div className="ml-3 d-flex text-center justify-content-end">
            <div className="text-weight-semi-bold text-up-02">
              {autor ? autor?.username : "Autor desconhecido"}
            </div>
            <div className="ml-auto">
              <div>{publicado_em}</div>
            </div>
          </div>
          <h6 className="text-left ml-3">{titulo}</h6>
          <span className="br-divider light-mode my-3"></span>
        </div>
        <div
          className={`card-content text-left ${imagem && "d-flex"}`}
          tabIndex={0}
        >
          <p className="ml-3">{descricao}</p>
          {imagem && (
            <img src={imagem} alt="imagem-pub" width={200} height={200} />
          )}
        </div>
        <div className="d-flex justify-content-end">
          <a
            className="br-button m-1"
            onClick={() => {
              setComentarios(!comentarios);
            }}
          >
            Ver comentários
          </a>
        </div>
        {comentarios && (
          <>
            <span className="br-divider light-mode mb-3 mx-3"></span>
            <div className="card-footer d-flex flex-column">
              <form onSubmit={handleSubmit(submitComment)}>
                <div className="flex-column text-left">
                  <button className="br-button secondary mb-2" type="submit">
                    Comentar
                  </button>
                  <div className="col-12">
                    <div className="br-input">
                      <input
                        id="input-default"
                        type="text"
                        placeholder="Escreva aqui seu comentário..."
                        {...register("mensagem")}
                      />
                    </div>
                    {errors.mensagem?.message && (
                      <span
                        className="feedback danger"
                        role="alert"
                        id="danger"
                      >
                        <i
                          className="fas fa-times-circle"
                          aria-hidden="true"
                        ></i>
                        {errors.mensagem?.message}
                      </span>
                    )}
                  </div>
                </div>
              </form>
              <div className="d-flex overflow-auto flex-column">
                {listaComentarios.map(
                  (comentario: ComentarioProps, index: number) => (
                    <div key={index} className="text-left w-fixed">
                      <div className="d-flex justify-content-between">
                        <legend className="text-up-02">{comentario.autor.username}</legend>
                        <legend className="text-weight-light">
                          {comentario.publicado_em.substring(0, 10)}
                        </legend>
                      </div>
                      <p>{comentario.mensagem}</p>
                    </div>
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
