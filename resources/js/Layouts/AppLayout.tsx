import { router } from "@inertiajs/core";
import { Link, Head } from "@inertiajs/react";
import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import ApplicationMark from "@/Components/ApplicationMark";
import Banner from "@/Components/Banner";
import Dropdown from "@/Components/Dropdown";
import DropdownLink from "@/Components/DropdownLink";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Team } from "@/types";
import { ModeToggle } from "@/Components/ui/mode-toggle";
import { Badge } from "@/Components/ui/badge";
import { Navbar } from "@/Components/Navbar";

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route("current-team.update"),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route("logout"));
  }

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar sidebar={false} />
        {/* <!-- Page Heading --> */}
        {renderHeader ? renderHeader() : null}

        {/* <!-- Page Content --> */}
        <main className="px-4 sm:px-6 md:px-12 lg:px-32 pb-20">{children}</main>
      </div>
    </div>
  );
}
