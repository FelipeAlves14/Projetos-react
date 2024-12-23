import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("O campo é obrigatório")
    .min(3, `O campo precisa de pelo menos 3 caracteres`),
  email: yup
    .string()
    .email("O valor não se refere a um email")
    .required("O campo é obrigatório")
    .max(30, `O campo tem um limite máximo de 30 caracteres`),
  telefone: yup
    .string()
    .nullable()
    .max(11, `O campo tem um limite máximo de 11 caracteres`),
  idade: yup
    .number()
    .positive("O valor deve ser um valor positivo")
    .required("O campo é obrigatório"),
});

/** Componente de formulário de submissão */

export default function Form(): JSX.Element {
  const [success, setSuccess] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function resetFields(): void {
    reset();
    setSuccess("");
  }

  function submitForm(data: object): void {
    console.log(data);
    setSuccess("Deu bom viu lindão!");
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="col-sm-8 col-lg-10">
          <div className="br-input">
            <label htmlFor="input-default">Nome</label>
            <input
              id="input-default"
              type="text"
              placeholder="Digite seu nome lindão..."
              {...register("nome")}
            />
            {errors.nome?.message && (
              <p className="text-danger">{errors.nome.message}</p>
            )}
          </div>
        </div>
        <div className="col-sm-8 col-lg-10">
          <div className="br-input">
            <label htmlFor="input-default">Email</label>
            <input
              id="input-default"
              type="email"
              placeholder="Digite seu email lindão..."
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="col-sm-8 col-lg-10">
          <div className="br-input">
            <label htmlFor="input-default">Telefone</label>
            <input
              id="input-default"
              type="text"
              placeholder="Digite seu telefone lindão..."
              {...register("telefone")}
            />
            {errors.telefone?.message && (
              <p className="text-danger">{errors.telefone.message}</p>
            )}
          </div>
        </div>
        <div className="col-sm-8 col-lg-10">
          <div className="br-input">
            <label htmlFor="input-default">Idade</label>
            <input
              id="input-default"
              type="text"
              placeholder="Digite sua idade lindão..."
              {...register("idade")}
            />
            {errors.idade?.message && (
              <p className="text-danger">{errors.idade.message}</p>
            )}
          </div>
        </div>
        <input
          className="br-button primary mr-5x"
          type="submit"
          value="Enviar"
        />
        <button
          className="br-button secondary"
          type="button"
          onClick={resetFields}
        >
          Limpar campos
        </button>
        {success && (
          <>
            <br />
            <p className="text-success">{success}</p>
          </>
        )}
      </form>
      <Link to="/" className="br-button primary">
        Voltar
      </Link>
    </>
  );
}
