import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import TopCreator from "@/components/shared/TopCreator";
import Topbar from "@/components/shared/Topbar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <TopCreator />

      <Bottombar />
    </div>
  );
};

export default RootLayout;
