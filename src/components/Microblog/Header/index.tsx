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
                <Link
                  className="br-item"
                  target="blank"
                  to="https://sproutsocial.com/pt/glossary/microblog/"
                >
                  O que é um Microblog?
                </Link>
              </div>
            </div>
            <span className="br-divider vertical mx-half mx-sm-1"></span>
            <div className="header-login">
              <div className="header-sign-in">
                <Link className="br-sign-in small" to="/Microblog/login">
                  <i className="fas fa-user" aria-hidden="true"></i>
                  <span className="d-sm-inline">
                    {user.username ? user.username : "Entrar"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="header-menu">
            <div className="header-menu-trigger">
              <img
                src="../images/Microblog.png"
                style={{ width: 50, height: 50 }}
                alt="logo"
              />
            </div>
            <div className="header-info">
              <div className="header-title">Microblog da PNP</div>
              <div className="header-subtitle">Seu microblog preferido</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
