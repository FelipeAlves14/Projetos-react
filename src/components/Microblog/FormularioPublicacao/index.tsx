import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axiosRequestor from "../axiosRequestor";
import { useNavigate } from "react-router-dom";

export interface PublicacaoFormProps {
  titulo: string;
  descricao: string;
  imagem?: string;
}

export default function FormularioPublicacao() {
  const schema = yup.object().shape({
    titulo: yup
      .string()
      .required("Preencha todos os campos obrigatórios")
      .max(200, "Este campo excedeu o limite de caracteres"),
    descricao: yup
      .string()
      .required("Preencha todos os campos obrigatórios")
      .max(1200, "Este campo excedeu o limite de caracteres"),
    imagem: yup.string(),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  async function submitPub(pub: PublicacaoFormProps): Promise<void> {
    try {
      await axiosRequestor.post("publicacao/", pub, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
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
      >
        <div className="text-weight-semi-bold col-10 text-center mb-3 text-up-03">
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
            id="single-file"
            type="file"
            accept="image/*"
            aria-hidden={false}
            aria-label="enviar arquivo"
          />
          <div className="upload-list mb-5"></div>
        </div>
        <button className="br-button primary mt-0 mr-4 ml-4 mb-4" type="submit">
          Publicar
        </button>
      </form>
    </>
  );
}
