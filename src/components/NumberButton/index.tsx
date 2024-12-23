import { Link } from "react-router-dom";
import { useState } from "react";
import INumberButtonProps from "./NumberButtonProps";

/** Componente de botão para incremento ou decremento de um número */

export default function NumberButton(): JSX.Element{
    const [numero, setNumero] = useState(0);

    return (
        <>
            <h1>Botão alterador de número</h1>
            <Button 
                func={() => setNumero(numero - 1)}
                content="-"
            />
            <p className={`mt-2x text-${numero < 0 ? "danger" : "success"} text-weight-bold`}>{numero}</p>
            <Button 
                func={() => setNumero(numero + 1)}
                content="+"
            />
            <h6>
                <Link className="br-button primary"
                    to="/"
                >
                Voltar
                </Link>
            </h6>
        </>
    );
}

function Button(props: INumberButtonProps){
    const {func, content } = props;

    return <button onClick={func} className="br-button circle primary">{content}</button>;
}