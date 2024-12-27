import { Link } from "react-router-dom";
import useUsersStore from "../usersStore";

export default function Header(): JSX.Element {
  const { user } = useUsersStore();
  return (
    <header className="br-header container-fluid compact mb-3">
      <div className="container-fluid">
        <div className="header-top">
          <div className="header-actions">
            <div className="header-links dropdown">
              <div className="br-list">
                <Link className="br-item" target="blank" to="https://sproutsocial.com/pt/glossary/microblog/">
                  O que é um Microblog?
                </Link>
                <a className="br-item" href="javascript:void(0)">
                  Sobre nós
                </a>
              </div>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1"></span>
            <div className="header-login">
              <div className="header-sign-in">
                <Link className="br-sign-in small" to={"/Microblog/login"}>
                  <i className="fas fa-user" aria-hidden="true"></i>
                  <span className="d-sm-inline">
                    {user ? user.username : "Entrar"}
                  </span>
                </Link>
              </div>
              <div className="header-avatar"></div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-menu">
            <div className="header-menu-trigger">
              <button
                className="br-button small circle"
                type="button"
                aria-label="Menu"
                data-toggle="menu"
                data-target="#main-navigation"
                id="menu-compact"
              >
                <i className="fas fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div className="header-info">
              <div className="header-title">Microblog da PNP</div>
              <div className="header-subtitle">Seu microblog preferido</div>
            </div>
            <div className="header-logo">
              <img
                src="../images/Microblog.png"
                style={{ width: 20, height: 20 }}
                alt="logo"
              />
              <span className="br-divider vertical"></span>
            </div>
          </div>
          <div className="header-search">
            <div className="br-input has-icon">
              <label htmlFor="searchbox-98886">Texto da pesquisa</label>
              <input
                id="searchbox-98886"
                type="text"
                placeholder="O que você procura?"
              />
              <button
                className="br-button circle small"
                type="button"
                aria-label="Pesquisar"
              >
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <button
              className="br-button circle search-close ml-1"
              type="button"
              aria-label="Fechar Busca"
              data-dismiss="search"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
