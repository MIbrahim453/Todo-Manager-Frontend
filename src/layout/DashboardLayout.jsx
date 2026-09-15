import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const location = useLocation();

  const role = location.pathname.startsWith("/admin") ? "admin" : "user";

  return (
    <Layout className="min-h-screen bg-background font-manrope">
      <Sidebar role={role} />
      <Layout className="min-w-0 bg-background">
        <main className="flex-1 bg-surface-muted px-5 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
