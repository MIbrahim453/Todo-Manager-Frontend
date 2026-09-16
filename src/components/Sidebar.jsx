import { Drawer, Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  MailOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import logo from "../assets/icons/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useAntdMessage from "../hooks/useAntdMessage.jsx";

const { Sider } = Layout;

const userItems = [
  {
    key: "/user/dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/user/todos",
    label: "My Todos",
    icon: <CheckCircleOutlined />,
  },
  {
    key: "/user/shared-with-me",
    label: "Shared With Me",
    icon: <MailOutlined />,
  },
  {
    key: "/user/profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
];

const adminItems = [
  {
    key: "/admin/dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/admin/users",
    label: "All Users",
    icon: <TeamOutlined />,
  },
  {
    key: "/admin/todos",
    label: "All Todos",
    icon: <UnorderedListOutlined />,
  },
  {
    key: "/admin/profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
];

function SidebarContent({ role, location, navigate, user, handleLogout, sectionLabel, styledItems }) {
  return (
    <div className="flex! h-full! flex-col! px-4! py-7! font-manrope! overflow-y-auto!">
      <div className="flex! items-center! gap-3! px-3! pb-8! shrink-0!">
        <img
          src={logo}
          alt="Todo Manager"
          className="h-[42px]! w-[42px]! shrink-0! object-contain!"
        />
        <div className="min-w-0!">
          <h1 className="m-0! text-[17px]! font-extrabold! leading-tight! text-text-primary!">
            Todo Manager
          </h1>
          <p className="mt-1! block! text-[11px]! leading-snug! text-text-muted!">
            Stay on top of what matters
          </p>
        </div>
      </div>

      <div className="px-3.5! pb-2.5! text-[10px]! font-extrabold! uppercase! tracking-[0.12em]! text-text-placeholder! shrink-0!">
        {sectionLabel}
      </div>
      <div className="flex-1!">
        <Menu
          mode="inline"
          items={styledItems}
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          className="border-0! bg-transparent! cursor-pointer!"
          style={{
            background: "transparent",
            borderInlineEnd: "none",
            color: "#25221e",
          }}
        />
      </div>

      <div className="mt-auto! pt-4! shrink-0!">
        <div className="flex! items-center! justify-between! gap-3! rounded-2xl! bg-surface-secondary! px-3.5! py-3!">
          <div
            onClick={() =>
              navigate(role === "admin" ? "/admin/profile" : "/user/profile")
            }
            title="View profile"
            className="flex! items-center! gap-2.5! min-w-0! cursor-pointer! group!"
          >
            <div className="flex! h-9! w-9! shrink-0! items-center! justify-center! rounded-full! bg-primary! text-primary-text! overflow-hidden! transition-transform! group-hover:scale-105!">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="h-full! w-full! object-cover!"
                />
              ) : (
                <UserOutlined className="text-sm!" />
              )}
            </div>
            <div className="min-w-0!">
              <h4 className="m-0! truncate! text-xs! font-bold! text-text-primary! leading-snug! group-hover:text-primary! transition-colors!">
                {user?.name || "User"}
              </h4>
              <p className="m-0! truncate! text-[11px]! text-text-muted! leading-snug!">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className="flex! h-8! w-8! shrink-0! items-center! justify-center! rounded-lg! border-0! bg-transparent! text-text-secondary! transition-colors! hover:bg-surface! hover:text-primary! cursor-pointer! p-0!"
          >
            <LogoutOutlined className="text-base!" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ role = "user", mobileOpen = false, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const { messageApi, contextHolder } = useAntdMessage()
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        messageApi.success(result.message || "User logout successfully");
        navigate("/login");
      } else {
        messageApi.error(result.message || "Logout failed");
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message || "Logout failed");
    }
  };
  const items = role === "admin" ? adminItems : userItems;
  const sectionLabel = role === "admin" ? "Admin Panel" : "Workspace";

  const styledItems = items.map((item) => ({
    ...item,
    style: {
      fontSize: "14px",
      fontWeight: 600,
      color: location.pathname === item.key ? "#fefdfc" : "#25221e",
      backgroundColor:
        location.pathname === item.key ? "#e34432" : "transparent",
      borderRadius: "10px",
    },
  }));

  const contentProps = {
    role,
    location,
    navigate,
    user,
    handleLogout,
    sectionLabel,
    styledItems,
  };

  return (
    <>
      {contextHolder}
      <Sider
        width={250}
        className="hidden! bg-background! border-r! border-border! md:block!"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <SidebarContent {...contentProps} />
      </Sider>
      <Drawer
        placement="left"
        width={280}
        open={mobileOpen}
        onClose={onMobileClose}
        closeIcon={<CloseOutlined />}
        title="Navigation"
        className="md:hidden!"
        styles={{
          header: { backgroundColor: "var(--color-background)" },
          body: { padding: 0, backgroundColor: "var(--color-background)" },
        }}
      >
        <SidebarContent {...contentProps} />
      </Drawer>
    </>
  );
}

export default Sidebar;
