import { IconFileX } from "@tabler/icons-react";

interface ViewerProps {
  url: string | null;
}

const Viewer = ({ url }: ViewerProps) => {
  return (
    <div>
      {url ? (
        <iframe
          src={`${url}#view=fitH`}
          title="PDF Viewer"
        />
      ) : (
        <div className="flex flex-col items-center justify-center  text-gray-500 bg-gray-100">
          <IconFileX size={64} stroke={1.5} className="mb-4" />
          <h1 className="text-lg font-medium">Nenhum documento selecionado</h1>
          <h3 className="text-base font-thin">
            Escolha um documento da lista para visualizar
          </h3>
        </div>
      )}
    </div>
  );
};

export default Viewer;
