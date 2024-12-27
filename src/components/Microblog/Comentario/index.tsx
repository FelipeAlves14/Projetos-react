import { UserProps } from "../Publicacao";

export interface ComentarioProps {
  autor: UserProps;
  mensagem: string;
  publicado_em: string;
}
export default function Comentario(props: ComentarioProps): JSX.Element {
  const { autor, mensagem, publicado_em } = props;
  const data_comentario = new Date(publicado_em);
  const dia = (data_comentario.getDate()).toString().padStart(2, "0");
  const mes = (data_comentario.getMonth() + 1).toString().padStart(2, "0");
  const ano = data_comentario.getFullYear().toString();
  return (
    <div className="text-left w-fixed">
      <div className="d-flex justify-content-between">
        <legend className="text-up-02">{autor.username}</legend>
        <legend className="text-weight-light">
          {dia}/{mes}/{ano}
        </legend>
      </div>
      <p>{mensagem}</p>
    </div>
  );
}
