import { IconFileX, IconLoader2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

interface DocumentViewerProps {
  url: string | null;
  title?: string;
}

const DocumentViewer = ({ url, title }: DocumentViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (url) {
      setIsLoading(true);
    }
  }, [url]);

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
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground z-10">
          <Spinner className="size-16"/>
          <div className="font-medium text-lg mt-4">Carregando documento...</div>
        </div>
      )}
      <iframe
      src={`${url}#view=fitH`}
      title={title || "Documento"}
      className="w-full h-full border-0"
      onLoad={() => setIsLoading(false)}
      />
    </div>
  
  );
};

export default DocumentViewer;
