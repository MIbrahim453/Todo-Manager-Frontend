import { useState, useContext } from "react";
import { Table, Tag, Button, Popconfirm, Tooltip, Input } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { UserContext } from "../../../context/userContext";
import useAntdMessage from "../../../hooks/useAntdMessage";

const roleConfig = {
  admin: { bg: "bg-primary", text: "text-primary-text" },
  member: { bg: "bg-info-bg", text: "text-info" },
};

function UsersTable() {
  const { allUsers, deleteUser, loading } = useContext(UserContext);
  const { messageApi, contextHolder } = useAntdMessage();
  const [search, setSearch] = useState("");

  const handleDelete = async (record) => {
    try {
      const res = await deleteUser(record._id);
      if (res?.success) {
        messageApi.success(res.message || "User deleted successfully");
      } else {
        messageApi.error(res?.message || "Failed to delete user");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to delete user");
    }
  };

  const rawUsers = Array.isArray(allUsers) ? allUsers : [];

  const filteredUsers = rawUsers.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: 240,
      render: (name, record) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 overflow-hidden">
            {record.profilePhoto ? (
              <img
                src={record.profilePhoto}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserOutlined />
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
      width: 260,
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
      width: 120,
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
    {
      title: "JOINED",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      align: "center",
      render: (date) => (
        <span className="text-sm text-text-muted whitespace-nowrap">
          {date && dayjs(date).isValid() ? dayjs(date).format("MMM DD, YYYY") : "—"}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-1.5">
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{
              danger: true,
              style: {
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                borderRadius: 6,
              },
            }}
            cancelButtonProps={{
              style: {
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                borderRadius: 6,
              },
            }}
          >
            <Tooltip title="Delete user">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span
              className="text-xl font-extrabold text-text-primary font-manrope"
              style={{ fontStyle: "italic" }}
            >
              All Users
            </span>
            <span className="text-xs text-text-muted font-manrope">
              {filteredUsers.length} total
            </span>
          </div>

          <Input
            placeholder="Search users by name or email..."
            prefix={<SearchOutlined className="text-text-placeholder" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-[280px] rounded-lg border-border"
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey={(record) => record._id || record.key}
          loading={loading}
          pagination={{
            pageSize: 6,
            showTotal: (total, range) =>
              `Showing ${range[0]}–${range[1]} of ${total} users`,
            size: "default",
          }}
          className="rounded-xl overflow-hidden border border-border bg-surface"
          size="middle"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
}

export default UsersTable;
