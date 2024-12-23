import { useState } from "react";
import { UserProps } from "../Cadastro"
import useUsersStore from "../usersStore";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

export interface PublicacaoProps {
    userPub?: UserProps,
    data?: string,
    titulo: string,
    descricao: string,
    imagem?: string,
}

interface ComentarioProps {
	user?: UserProps,
	mensagem: string,
	data?: Date
}

export default function Publicacao(props: PublicacaoProps){


    function submitComment(data: ComentarioProps){

        const comentario: ComentarioProps = {user: user, mensagem: data.mensagem, data: new Date()};
        listaComentarios.push(comentario);
        setListaComentarios(listaComentarios);
        reset();
    }

    const schema = yup.object().shape({
        mensagem: yup.string().required("Escreva seu comentário para podermos enviá-lo").max(400, "Este campo excedeu o limite de caracteres")
    });
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const { user } = useUsersStore();
    const { userPub, data, descricao, imagem, titulo } = props;
    const [comentarios, setComentarios] = useState<boolean>(false);
    const [listaComentarios, setListaComentarios] = useState<ComentarioProps[]>([]);

    return (
        <div className="col-10 p-0">
          	<div className="br-card">
            	<div className="card-header">
              		<div className="ml-3 d-flex text-center justify-content-end">
                		<div className="text-weight-semi-bold text-up-02">{
                    		userPub
                    		? userPub?.usuario 
                    		: "Autor desconhecido"
                  		}
                		</div>
                		<div className="ml-auto">
                  			<div>{data}</div>
                		</div>
              		</div>
              		<h6 className="text-left ml-3">{titulo}</h6>
              		<span className="br-divider light-mode my-3"></span>
            	</div>
            	<div className={`card-content text-left ${imagem && "d-flex"}`} tabIndex={0}>
              		<p className="ml-3">{descricao}</p>
              		{imagem && <img src={imagem} alt="imagem-pub" width={200} height={200} />}
            	</div>
            	<div className="d-flex justify-content-end">
              		<a className="br-button m-1" onClick={() => {setComentarios(!comentarios)}}>Ver comentários</a>
            	</div>
            	{comentarios && (
                	<>
                    	<span className="br-divider light-mode mx-3"></span>
                    	<div className="card-footer d-flex flex-column">
                    	  	<form onSubmit={handleSubmit(submitComment)}>
                    	    	<div className="flex-column text-left">
                    	      		<button className="br-button secondary m-1" type="submit">Comentar</button>
                    	      		<div className="col-12">
                    	        		<div className="br-input">
                    	          			<input id="input-default" type="text" placeholder="Escreva aqui seu comentário..." {...register("mensagem")} />
                    	        		</div>
                    	        		{errors.mensagem?.message && 
                    	          			<span className="feedback danger" role="alert" id="danger">
                    	            			<i className="fas fa-times-circle" aria-hidden="true"></i>
                    	            			{errors.mensagem?.message}
                    	          			</span>
                    	        		}
                    	      		</div>
                    	    	</div>
                    	  </form>
                    	  <div className="d-flex overflow-auto flex-column">
                    	    {listaComentarios.map((comentario: ComentarioProps) => (
                    	        <div className="text-left w-fixed">
                    	            <div className="d-flex justify-content-between">
                    	              	{
                    	                  	comentario.user 
                    	                  	? <legend className="text-up-02">{userPub?.usuario}</legend>
                    	                  	: <legend className="text-up-02">Autor desconhecido</legend>
                    	              	}
                    	              	<legend className="text-weight-light">{comentario.data?.toLocaleDateString()}</legend>
                    	            </div>
                    	            <p>{comentario.mensagem}</p>
                    	        </div>
                    	    	))}
                    	  	</div>
                    	</div>
                	</>
            	)}
          	</div>
        </div>
    )
}