import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronDown, ChevronUp, Files } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import DocumentViewer from "./document-viewer"

type Document = {
  id: string
  url: string
  title: string
  items?: Document[]
}

export interface DocumentsSidebarProps {
   activeDocumentId?: string
   data: Array<{
    title: string;
    items: Document[]
  }>
}

export function DocumentsSidebar({data, activeDocumentId}: Readonly<DocumentsSidebarProps>) {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(undefined);
  const selectedDocument = data
    .flatMap((section) => section.items)
    .find((doc) => doc.id === selectedDocumentId);

  const onDocumentSelect = (id: string) => {
    setSelectedDocumentId(id);
  }
  
  return (
    <Sidebar>
      <Dialog open={!!selectedDocumentId} onOpenChange={() => setSelectedDocumentId(undefined)}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Files className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Documentação</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((section, index) => (
                <Collapsible
                  key={section.title}
                  defaultOpen={index === 0}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className='font-medium'>
                        {section.title}
                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {section.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {renderDocuments(section.items, activeDocumentId, onDocumentSelect)}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <DialogContent  className="px-6 sm:max-w-screen-md xl:max-w-screen-xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-[600px]">
           <DocumentViewer url={selectedDocument?.url || null} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  )
}

function renderDocuments(
  documents: Document[],
  activeDocumentId?: string,
  onDocumentSelect?: (id: string) => void,
  level = 0
) {
  const handleDocumentClick = (id: string) => {
    if (onDocumentSelect) {
      onDocumentSelect(id);
    }
  }

  return documents.map((doc) => {
    if (doc.items && doc.items.length > 0) {
      return (
        <Collapsible key={doc.title}>
          <SidebarMenuItem>
            <CollapsibleTrigger className="group" asChild>
              <SidebarMenuButton style={{ paddingLeft: `${level * 1.5 + 1}rem` }}>
                {doc.title}
                <ChevronDown className="ml-auto group-data-[state=open]:hidden" />
                <ChevronUp className="ml-auto group-data-[state=closed]:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {renderDocuments(doc.items, activeDocumentId, onDocumentSelect, level + 1)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }
    return (
      <SidebarMenuSubItem className="" key={doc.id}>
        <SidebarMenuSubButton
          asChild
          isActive={activeDocumentId === doc.id}
          onClick={() => handleDocumentClick(doc.id)}
          style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
          className={`data-[active=true]:bg-zinc-300 cursor-pointer h-auto p-1 ${level > 0 ? "text-xs" : ""}`}
          // data-[active=true]:bg-sidebar-accent
        >
          <p>{doc.title}</p>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  });
}