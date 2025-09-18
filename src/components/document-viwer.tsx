import { IconFileX } from "@tabler/icons-react";

interface DocumentViewerProps {
  url: string | null;
}

const DocumentViewer = ({ url }: DocumentViewerProps) => {
  if (!url) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-gray-500 bg-gray-100 gap-[6px]">
        <IconFileX size={100} stroke={1.25} className="text-muted-foreground" />
        <div className="font-medium font-inter text-[18px] text-muted-foreground">Nenhum documento selecionado</div>
        <div className="font-inter text-[14px] text-muted-foreground">
          Escolha um documento da lista para visualizar
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={`${url}#view=fitH`}
      title="PDF DocumentViewer"
      className="w-full h-full border-0 font-inter"
    />
  );
};

export default DocumentViewer;
