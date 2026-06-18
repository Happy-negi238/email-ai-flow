import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col h-full min-h-0 overflow-hidden">
        <SiteHeader />
        <main className="flex flex-1 flex-col overflow-y-auto min-h-0">
          <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 flex-1 min-h-0">
              <div className="px-4 lg:px-6 flex flex-col flex-1 min-h-0">
                {children}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
