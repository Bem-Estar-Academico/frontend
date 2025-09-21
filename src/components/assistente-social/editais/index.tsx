import { Link } from "@tanstack/react-router"

const ids = [1, 2, 3, 4]

export function Editais() {
  return (
    <div>
      <h2>Lista de Editais</h2>
      <ul>
        {ids.map((id) => (
          <li key={id}>
            <Link to={`/assistente-social/editais/${id}`}>
              Edital {id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}