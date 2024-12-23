import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../Header";
import axiosRequestor from "../axiosRequestor";
import { setToken } from "../usersStore";

export default function Login() {
  interface signInProps {
    username: string;
    senha: string;
  }

  const schema = yup.object().shape({
    username: yup.string().required("Todos os campos devem estar preenchidos"),
    senha: yup.string().required("Todos os campos devem estar preenchidos"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [errorCredentials, setErrorCredentials] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function submitForm(data: signInProps): Promise<void> {
    setErrorCredentials("");
    try {
      const { username, senha } = data;
      const signIn = { username: username, password: senha };
      const response = await axiosRequestor.post("login/", signIn, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { access } = response.data;

      setToken(access);

      setSuccess(`Conta autenticada com sucesso, olá ${data["username"]}`);
      setTimeout(() => {
        navigate("/Microblog/inicio");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorCredentials("Credenciais inválidas, por favor tente novamente.");
    }
  }

  return (
    <>
      <Header />
      <form
        className="container d-flex flex-column align-items-center p-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1>Faça login!</h1>
        <h3>
          Ainda não possui conta? <a href="/Microblog/cadastro">clique aqui</a>{" "}
          para se cadastrar conosco!
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
            </div>
          </div>
        </div>
        <button className="br-button primary" type="submit">
          <i className="fas fa-user" aria-hidden="true"></i>
          Entrar
        </button>
        {errorCredentials && (
          <span className="feedback danger" role="alert" id="danger">
            <i className="fas fa-times-circle" aria-hidden="true"></i>
            {errorCredentials}
          </span>
        )}
        {success && (
          <span className="feedback success" role="alert" id="success">
            <i className="fas fa-check-circle" aria-hidden="true"></i>
            {success}
          </span>
        )}
      </form>
    </>
  );
}