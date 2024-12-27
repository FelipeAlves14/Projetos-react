import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosRequestor from "../axiosRequestor";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

export interface PublicacaoFormProps {
  titulo: string;
  descricao: string;
  imagem?: File;
}

export default function FormularioPublicacao(): JSX.Element {
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
  const navigate: NavigateFunction = useNavigate();
  async function submitPub(pub: PublicacaoFormProps): Promise<void> {
    try {
      const data: PublicacaoFormProps = {
        titulo: pub.titulo,
        descricao: pub.descricao,
        imagem: pub.imagem[0] ?? "",
      };
      await axiosRequestor.post("publicacao/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      window.location.reload();
    } catch (err) {
      console.error(err);
      navigate("/Microblog/login");
    }
  }

  return (
    <>
      <form
        className="col-5 shadow-sm pt-3"
        style={{ position: "fixed" }}
        onSubmit={handleSubmit(submitPub)}
        encType="multipart/form-data"
      >
        <div className="text-weight-semi-bold col-10 text-center ml-5 mb-3 text-up-03">
          Faça uma publicação
        </div>
        <div className="col-10 mb-3">
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
        <div className="text-left col-10 pl-4 mb-3 br-textarea">
          <label htmlFor="textarea-id1">Descrição</label>
          <textarea
            id="textarea-id1"
            placeholder="Ex.: muito bom o Microblog..."
            {...register("descricao")}
          ></textarea>
          {errors.descricao?.message && (
            <span className="feedback danger" role="alert" id="danger">
              <i className="fas fa-times-circle" aria-hidden="true"></i>
              {errors.descricao?.message}
            </span>
          )}
        </div>
        <div className="text-left mb-3 pl-4">
          <label className="upload-label" htmlFor="multiple-files">
            <span>Envio de arquivos</span>
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
        <button className="br-button primary mt-0 mr-4 ml-4 mb-4" type="submit">
          Publicar
        </button>
        <div className="col-5 shadow-sm p-3 mt-6" style={{ position: "fixed" }}>
          <div className="m-3">
            <h3>Quer descobrir em que foi inspirado o nosso microblog?</h3>
            <h3 className="mb-6">
              E nossos padrões de design, tem curiosidade?
            </h3>
          </div>
          <div className="br-magic-button text-center">
            <Link
              to="https://www.gov.br/ds/home"
              target="blank"
              className="br-button"
              type="button"
            >
              Descubra aqui
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
