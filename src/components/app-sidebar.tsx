import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  NotebookTabs,
  PenLineIcon,
  Vault,
  UserCircle,
  Settings,
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-bold">MindVault</h1>
      </div>
      <SidebarContent>
        <SidebarGroup className="mt-5">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded"
          >
            <Vault className="w-6 h-6" />
            Brain Vault
          </Link>
          <Link
            href="/mind/dashboard/notes"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded"
          >
            <NotebookTabs className="w-6 h-6" />
            Notes
          </Link>
          <Link
            href="/mind/dashboard/brainboard"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded"
          >
            <PenLineIcon className="w-6 h-6" />
            Brainboard
          </Link>
        </SidebarGroup>

        <SidebarGroup className="mt-5">
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded"
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          © 2025 MindVault
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
