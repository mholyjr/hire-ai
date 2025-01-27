import React from "react";
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
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import ApplicationMark from "@/Components/ApplicationMark";
import { PositionSwitcher } from "@/Components/PositionSwitcher";
import { Position } from "@/types";
import { Home, PlusCircleIcon, Users } from "lucide-react";
import Settings from "../Settings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { DragDrop } from "@/Components/DragDrop";
import { useToast } from "@/Hooks/use-toast";

export const LayoutSidebar = ({
  positions,
  position,
}: {
  positions: Position[];
  position: Position;
}) => {
  const { toast } = useToast();
  const { url } = usePage();

  const currentPath = new URL(url, window.location.origin).pathname;

  const navigationItems = [
    {
      title: "Overview",
      icon: Home,
      getUrl: (slug: string) => route("positions.show", slug),
      isActive: (currentUrl: string, slug: string) =>
        currentUrl ===
        new URL(route("positions.show", slug), window.location.origin).pathname,
    },
    {
      title: "Candidates",
      icon: Users,
      getUrl: (slug: string) => route("positions.show", slug),
      isActive: (currentUrl: string, slug: string) =>
        currentUrl ===
        new URL(route("positions.show", slug), window.location.origin).pathname,
    },
    {
      title: "Settings",
      icon: Settings,
      getUrl: (slug: string) => route("positions.settings", slug),
      isActive: (currentUrl: string, slug: string) =>
        currentUrl ===
        new URL(route("positions.settings", slug), window.location.origin)
          .pathname,
    },
  ];

  console.log(url, route("positions.settings", position.slug));

  return (
    <Sidebar>
      <SidebarHeader className="">
        {/* <Link href={route("dashboard")}>
          <ApplicationMark className="block h-9 w-auto" />
        </Link> */}
        <PositionSwitcher positions={positions} currentPosition={position} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="inline-flex gap-2">
                <PlusCircleIcon size={16} /> Upload CV
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start">
              <DragDrop
                position={position}
                onUploadSuccess={path => {
                  toast({
                    title: "The upload is complete 🎉",
                    description:
                      "Your CV has been uploaded successfully. Please wait for the AI to review it.",
                  });
                }}
                onUploadError={error => {
                  toast({
                    variant: "destructive",
                    title: "Upload has failed",
                    description: "Upload wasn't successful. Please try again.",
                  });
                }}
              />
            </PopoverContent>
          </Popover>
        </SidebarGroup>
        <SidebarGroup className="px-4">
          <SidebarGroupLabel>Position settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive(url, position.slug)}
                  >
                    <Link
                      href={item.getUrl(position.slug)}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      {/* <item.icon className="w-5 h-5" /> */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
