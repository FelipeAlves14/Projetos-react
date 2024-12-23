import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="br-header container-fluid compact mb-3">
      <div className="container-fluid">
        <div className="header-top">
          <div className="header-actions">
            <div className="header-links dropdown">
              <button
                className="br-button circle small"
                type="button"
                data-toggle="dropdown"
                aria-label="Abrir Acesso Rápido"
              >
                <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
              </button>
              <div className="br-list">
                <div className="header">
                  <div className="title">Acesso Rápido</div>
                </div>
                <a className="br-item" href="javascript:void(0)">
                  O que é um Microblog?
                </a>
                <a className="br-item" href="javascript:void(0)">
                  Sobre nós
                </a>
              </div>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1"></span>
            <div className="header-functions dropdown">
              <button
                className="br-button circle small"
                type="button"
                data-toggle="dropdown"
                aria-label="Abrir Funcionalidades do Sistema"
              >
                <i className="fas fa-th" aria-hidden="true"></i>
              </button>
              <div className="br-list">
                <div className="header">
                  <div className="title">Funcionalidades do Sistema</div>
                </div>
                <div className="br-item">
                  <button
                    className="br-button circle small"
                    type="button"
                    aria-label="Funcionalidade 1"
                  >
                    <i className="fas fa-chart-bar" aria-hidden="true"></i>
                    <span className="text">Funcionalidade 1</span>
                  </button>
                </div>
                <div className="br-item">
                  <button
                    className="br-button circle small"
                    type="button"
                    aria-label="Funcionalidade 2"
                  >
                    <i className="fas fa-headset" aria-hidden="true"></i>
                    <span className="text">Funcionalidade 2</span>
                  </button>
                </div>
                <div className="br-item">
                  <button
                    className="br-button circle small"
                    type="button"
                    aria-label="Funcionalidade 3"
                  >
                    <i className="fas fa-comment" aria-hidden="true"></i>
                    <span className="text">Funcionalidade 3</span>
                  </button>
                </div>
                <div className="br-item">
                  <button
                    className="br-button circle small"
                    type="button"
                    aria-label="Funcionalidade 4"
                  >
                    <i className="fas fa-adjust" aria-hidden="true"></i>
                    <span className="text">Funcionalidade 4</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="header-search-trigger">
              <button
                className="br-button circle"
                type="button"
                aria-label="Abrir Busca"
                data-toggle="search"
                data-target=".header-search"
              >
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <div className="header-login">
              <div className="header-sign-in">
                <Link className="br-sign-in small" to={"/Microblog/login"}>
                  <i className="fas fa-user" aria-hidden="true"></i>
                  <span className="d-sm-inline">Entrar</span>
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
