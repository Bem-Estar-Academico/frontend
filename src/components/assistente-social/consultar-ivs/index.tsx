import { Link } from "@tanstack/react-router"

const ids = [1, 2, 3, 4]

export function IVS() {
  return (
    <div>
      <h2>Lista de IVS</h2>
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link to={`/assistente-social/consultar-ivs/${id}`}>
              Aluno {id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}