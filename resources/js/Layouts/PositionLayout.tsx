import ApplicationMark from "@/Components/ApplicationMark";
import Banner from "@/Components/Banner";
import { Navbar } from "@/Components/Navbar";
import { PositionSwitcher } from "@/Components/PositionSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import useTypedPage from "@/Hooks/useTypedPage";
import { Head, Link } from "@inertiajs/react";
import { Home } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { useRoute } from "ziggy-js";

interface Props {
  title: string;
  sidebar?: JSX.Element;
  renderHeader?(): JSX.Element;
}

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
];

export default function PositionLayout({
  title,
  renderHeader,
  children,
  sidebar,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();

  return (
    <div>
      <Head title={title} />

      <SidebarProvider>
        {sidebar && sidebar}
        <main className="w-full">
          <Navbar sidebar={true} />
          {renderHeader ? renderHeader() : null}

          <Banner />
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
