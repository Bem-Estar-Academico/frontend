import { createFileRoute, Link } from "@tanstack/react-router";

const ids = [1, 2, 3, 4];

export const Route = createFileRoute("/_social-workers/consultar-ivs/")({
  component: IVS,
});

export function IVS() {
  return (
    <div>
      <h2>Lista de IVS</h2>
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link to={`/consultar-ivs/$id`} params={{ id: String(id) }}>Aluno {id}</Link>
          </li>
        ))}
      </ul>
    </div>

  );
}
