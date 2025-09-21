import { HeaderAssistenteSocial } from "../header";

type props = {
  id: string;
  name: string;
};

export function PageIVS({ id, name }: props) {
  return (
    <>
    <HeaderAssistenteSocial name={name}/>
      <div>Puxar o IVS do aluno com id: {id}</div>
    </>
  );
}
