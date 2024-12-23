import { Link } from "react-router-dom";
import { JSX } from "react";

export default function Main(): JSX.Element{
    return (
        <>
            <h1>Escolha aqui qual projetinho deseja ver</h1>
            <header className="br-header">
                <div className="container-lg">
                    <div className="header-top">
                    <Link 
                        className="br-item" 
                        to="/numberButton"
                    >
                        Botão incremental e decremental de um número
                    </Link>
                    <Link 
                        className="br-item" 
                        to="/form"
                    >
                        Formulário com validações utilizando yup
                    </Link>

                    <Link 
                        className="br-item" 
                        to="/harry-potter-characters"
                    >
                        Lista de personagens de Harry Potter via API
                    </Link>
                    <Link 
                        className="br-item" 
                        to="/Microblog/cadastro"
                    >
                        Microblog da PNP
                    </Link>
                    </div>
                </div>
            </header>
        </>
    );
}