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
   onDocumentSelect?: (id: string) => void
}

export function DocumentsSidebar({data, activeDocumentId, onDocumentSelect}: Readonly<DocumentsSidebarProps>) {
  return (
    <Sidebar>
      <Dialog>
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
         <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
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