import { useEffect, useState, JSX } from "react";
import { axiosRequestor } from "./APIRequestor";
import CharacterProps from "./CharacterProps";
import { Link } from "react-router-dom";

/** Componente de página de listagem de personagens de Harry Potter */

export default function HarryPotterAPI(): JSX.Element {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCharacters() {
    const dados = await axiosRequestor.get("characters");
    setCharacters(dados.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCharacters();
  }, [characters]);

  return (
    <>
      <h1 className="text-up-04 text-center text-weight-semi-bold">
        Lista de personagens de Harry Potter
      </h1>
      <Link className="br-button primary mb-4x" to="/">
        Voltar
      </Link>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div className="characters">
          {characters.map((character) => (
            <div
              className="character mb-10x border-solid-md"
              key={character.id}
            >
              <h2>{character.name}</h2>
              <div className="foto mb-5x">
                {character.image ? (
                  <img
                    src={character.image}
                    style={{ width: "auto", height: "300px" }}
                    alt={character.name}
                  />
                ) : (
                  <p>Sorry, this character has no one photos 😢😢</p>
                )}
                {character.house ? (
                  <img src={`images/${character.house}.png`} alt="house" />
                ) : (
                  <p>Sorry, this character is homeless (that´s sad 😢😢)</p>
                )}
              </div>
              {character.alternate_names.length > 0 ? (
                <p>Most named like</p>
              ) : (
                <p>Sorry, no one talks about this character 😭😭</p>
              )}
              {character.alternate_names.map((alternateName: string) => (
                <h6 key={alternateName}>{alternateName}</h6>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
