import { Button, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = location.pathname.startsWith("/admin") ? "admin" : "user";

  return (
    <Layout className="min-h-screen bg-background font-manrope">
      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Layout className="min-w-0 bg-background">
        <div className="flex! items-center! border-b! border-border! bg-background! px-5! py-3! md:hidden!">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="flex! items-center! justify-center! text-text-primary!"
          />
          <span className="ml-2! text-sm! font-bold! text-text-primary!">
            {role === "admin" ? "Admin Panel" : "Workspace"}
          </span>
        </div>
        <main className="flex-1! bg-surface-muted! px-5! py-6! sm:px-8! sm:py-8!">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
