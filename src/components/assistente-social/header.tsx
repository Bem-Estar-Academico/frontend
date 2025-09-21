import { Link } from "@tanstack/react-router";

type props = {
  name: string;
};

export function HeaderAssistenteSocial({ name }: props) {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <img src="../../../public/logo-ufal.png" />
        <div className="px-2 font-bold">
          <Link to="/assistente-social/editais">Editais</Link>
          <Link to="/assistente-social/consultar-ivs">Consultar IVS</Link>
        </div>
        <div className="flex flex-row">
          <img src="../../../public/bell.png" />
          <span>{name}</span>
        </div>
      </nav>
    </header>
  );
}
