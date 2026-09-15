import { useContext } from "react";
import { Table, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../../context/userContext";

const roleConfig = {
  admin: { bg: "bg-primary", text: "text-primary-text" },
  member: { bg: "bg-info-bg", text: "text-info" },
};

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    width: "38%",
    render: (name, record) => (
      <div className="flex items-center gap-3 whitespace-nowrap">
        <div className="flex h-[34px] w-[34px] items-center justify-center shrink-0 rounded-[10px] bg-surface-secondary overflow-hidden">
          {record.profilePhoto ? (
            <img
              src={record.profilePhoto}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserOutlined className="text-sm text-text-secondary" />
          )}
        </div>
        <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
          {name || "User"}
        </span>
      </div>
    ),
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
    width: "42%",
    render: (email) => (
      <span className="text-sm text-text-secondary whitespace-nowrap">
        {email}
      </span>
    ),
  },
  {
    title: "ROLE",
    dataIndex: "role",
    key: "role",
    width: "20%",
    align: "center",
    render: (role) => {
      const key = role?.toLowerCase() || "member";
      const badge = roleConfig[key] || roleConfig.member;
      return (
        <Tag
          bordered={false}
          className={`${badge.bg} ${badge.text} font-bold text-[10px] rounded px-2.5 py-0.5 m-0 tracking-wide uppercase`}
        >
          {role || "member"}
        </Tag>
      );
    },
  },
];

function RecentUsersTable() {
  const { recentUsers, loading } = useContext(UserContext);

  const data = Array.isArray(recentUsers) ? recentUsers : [];

  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <span
          className="text-xl font-extrabold text-text-primary font-manrope"
          style={{ fontStyle: "italic" }}
        >
          Recent Users
        </span>
        <span className="text-xs text-text-muted font-manrope">
          Latest {data.length} registered
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id || record.key}
        loading={loading}
        pagination={false}
        className="rounded-xl overflow-hidden border border-border bg-surface"
        size="middle"
        scroll={{ x: 600 }}
      />
    </div>
  );
}

export default RecentUsersTable;
