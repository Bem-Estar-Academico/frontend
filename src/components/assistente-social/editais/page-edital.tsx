import { HeaderAssistenteSocial } from "../header";

type props = {
  id: string;
  name: string;
};

export function PageEdital({ id, name }: props) {
  return (
    <>
    <HeaderAssistenteSocial name={name}/>
      <div>Puxar o edital com id: {id}</div>
    </>
  );
}
