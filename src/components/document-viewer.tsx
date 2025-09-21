import { IconFileX } from "@tabler/icons-react";

interface DocumentViewerProps {
  url: string | null;
  title?: string;
}

const DocumentViewer = ({ url, title }: DocumentViewerProps) => {
  if (!url) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-muted-foreground bg-muted">
        <IconFileX size={100} stroke={1.25} className="mt-4" />
        <div className="font-medium text-lg">Nenhum documento selecionado</div>
        <div className="text-sm mt-1.5">
          Escolha um documento da lista para visualizar
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={`${url}#view=fitH`}
      title={title || "Documento"}
      className="w-full h-full border-0"
    />
  );
};

export default DocumentViewer;
