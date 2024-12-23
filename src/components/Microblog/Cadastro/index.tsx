import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosRequestor from "../axiosRequestor";

export interface UserProps {
  [key: string]: string;
  username: string;
  nome: string;
  senha: string;
  confirmSenha: string;
}

export default function Cadastro() {
  const schema = yup.object().shape({
    username: yup.string().required("Todos os campos devem estar preenchidos"),
    nome: yup.string().required("Todos os campos devem estar preenchidos"),
    senha: yup.string().required("Todos os campos devem estar preenchidos"),
    confirmSenha: yup
      .string()
      .required("Todos os campos devem estar preenchidos"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [errorSenha, setErrorSenha] = useState<string>("");
  const [errorUser, setErrorUser] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function submitForm(data: UserProps): Promise<void> {
    setErrorSenha("");
    setErrorUser("");
    if (data["senha"] !== data["confirmSenha"]) {
      setErrorSenha("As senhas não conferem");
      return;
    }
    try {
      const { username, nome, senha } = data;
      const signUp = { username: username, nome: nome, senha: senha };
      await axiosRequestor.post("cadastrar/", signUp);
      const signIn = { username: username, password: senha };
      await axiosRequestor.post("login/", signIn, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess(`Conta cadastrada com sucesso, olá ${data["username"]}`);
      setTimeout(() => {
        navigate("/Microblog/inicio");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorUser("Este nome de usuário já está sendo utilizado");
    }
  }

  return (
    <form
      className="container d-flex flex-column align-items-center p-3"
      encType="multipart/form-data"
      onSubmit={handleSubmit(submitForm)}
    >
      <h1>Cadastre-se</h1>
      <h3>
        Já possui alguma conta? <a href="/Microblog/login">clique aqui</a> para
        entrar!
      </h3>
      <div className="col-sm-6 col-lg-4 mb-3">
        <div className="br-input">
          <label htmlFor="input-icon">Usuário</label>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-user-tie" aria-hidden="true"></i>
            </div>
            <input
              id="input-icon"
              type="text"
              placeholder="Ex.: LipeAlves"
              {...register("username")}
            />
            {errors.username?.message && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errors.username.message}
              </span>
            )}
            {errorUser && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errorUser}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-4 mb-3">
        <div className="br-input">
          <label htmlFor="input-icon">Nome</label>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-user" aria-hidden="true"></i>
            </div>
            <input
              id="input-icon"
              type="text"
              placeholder="Ex.: Felipe Alves de Vasconcelos"
              {...register("nome")}
            />
            {errors.nome?.message && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errors.nome.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-4 mb-3">
        <div className="br-input">
          <label htmlFor="input-icon">Senha</label>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <input
              id="input-icon"
              type="password"
              placeholder="Digite sua senha..."
              {...register("senha")}
            />
            {errors.senha?.message && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errors.senha.message}
              </span>
            )}
            {errorSenha && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errorSenha}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-4 mb-3">
        <div className="br-input">
          <label htmlFor="input-icon">Confirmação de senha</label>
          <div className="input-group">
            <div className="input-icon">
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
            <input
              id="input-icon"
              type="password"
              placeholder="Digite sua senha novamente..."
              {...register("confirmSenha")}
            />
            {errors.confirmSenha?.message && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errors.confirmSenha.message}
              </span>
            )}
            {errorSenha && (
              <span className="feedback danger" role="alert" id="danger">
                <i className="fas fa-times-circle" aria-hidden="true"></i>
                {errorSenha}
              </span>
            )}
          </div>
        </div>
      </div>
      <button className="br-sign-in primary" type="submit">
        <i className="fas fa-user" aria-hidden="true"></i>
        Entrar
      </button>
      {success && (
        <span className="feedback success" role="alert" id="success">
          <i className="fas fa-check-circle" aria-hidden="true"></i>
          {success}
        </span>
      )}
    </form>
  );
}