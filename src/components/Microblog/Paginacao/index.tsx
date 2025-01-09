import { useState } from "react";
import Page from "./Page";

export interface PaginacaoProps {
  pages: number[];
  currentPage: number;
  setPage: (newPage: number) => void;
  error?: string;
}

export default function Paginacao(props: PaginacaoProps) {
  const [reticenciasIsOpen, setReticenciasIsOpen] = useState<boolean>(false);
  const { pages, currentPage, setPage, error } = props;
  return (
    <>
      <nav
        className="br-pagination large my-3"
        aria-label="paginação"
        data-total="3"
        data-current="1"
      >
        <ul>
          <li>
            <button
              className="br-button circle"
              type="button"
              data-previous-page="data-previous-page"
              aria-label="Voltar página"
              onClick={() => setPage(currentPage - 1)}
            >
              <i className="fas fa-angle-left" aria-hidden="true"></i>
            </button>
          </li>
          {pages.length <= 7 ? (
            <div>
              {pages.map((page, index) => (
                <Page
                  key={index}
                  page={page}
                  isActive={currentPage === page + 1}
                  activePage={() => setPage(page + 1)}
                />
              ))}
            </div>
          ) : (
            <div>
              {pages.slice(0, 3).map((page, index) => (
                <Page
                  key={index}
                  page={page}
                  isActive={currentPage === page + 1}
                  activePage={() => setPage(page + 1)}
                />
              ))}
              <li className="pagination-ellipsis">
                <button
                  className="br-button circle"
                  type="button"
                  data-toggle="dropdown"
                  aria-label="Abrir ou fechar a lista de paginação"
                  onClick={() => setReticenciasIsOpen(!reticenciasIsOpen)}
                >
                  <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
                </button>
                {reticenciasIsOpen && (
                  <div className="br-list" role="menu">
                    {pages.slice(3, -2).map((page, index) => (
                      <Page
                        key={index}
                        page={page}
                        isActive={currentPage === page + 1}
                        activePage={() => setPage(page + 1)}
                      />
                    ))}
                  </div>
                )}
                {pages.slice(-2).map((page, index) => (
                  <Page
                    key={index}
                    page={page}
                    isActive={currentPage === page + 1}
                    activePage={() => setPage(page + 1)}
                  />
                ))}
              </li>
            </div>
          )}
          <li>
            <button
              className="br-button circle"
              type="button"
              data-next-page="data-next-page"
              aria-label="Página seguinte"
              onClick={() => setPage(currentPage + 1)}
            >
              <i className="fas fa-angle-right" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
      </nav>
      {error && (
        <div className="text-center mb-6">
          <span className="feedback info" role="alert" id="info">
            <i className="fas fa-info-circle" aria-hidden="true"></i>
            {error}
          </span>
        </div>
      )}
    </>
  );
}
