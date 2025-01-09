export interface PageProps {
  page: number;
  isActive: boolean;
  activePage: () => void;
}

export default function Page(props: PageProps) {
  const { page, isActive, activePage } = props;
  return (
    <li>
      <button
        className={`page ${isActive && "active"}`}
        aria-label={`Página ${page + 1}`}
        onClick={activePage}
      >
        {page + 1}
      </button>
    </li>
  );
}
