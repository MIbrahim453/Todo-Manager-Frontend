import { useState, useContext } from "react";
import { Table, Tag, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { TodoContext } from "../../../context/todoContext";

const priorityConfig = {
  high: { bg: "bg-primary", text: "text-primary-text" },
  medium: { bg: "bg-amber-600", text: "text-white" },
  low: { bg: "bg-success", text: "text-primary-text" },
};

const statusConfig = {
  pending: { bg: "bg-amber-100", text: "text-amber-700" },
  completed: { bg: "bg-success-bg", text: "text-success" },
};

const filterTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

function TodosTable() {
  const { allTodos, loading } = useContext(TodoContext);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const rawTodos = Array.isArray(allTodos) ? allTodos : [];

  const filteredTodos = rawTodos.filter((todo) => {
    const status = todo.status?.toLowerCase() || "pending";
    if (activeFilter === "pending" && status !== "pending") return false;
    if (activeFilter === "completed" && status !== "completed") return false;

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const matchTitle = todo.title?.toLowerCase().includes(query);
      const matchDesc = todo.description?.toLowerCase().includes(query);
      return matchTitle || matchDesc;
    }

    return true;
  });

  const columns = [
    {
      title: "TASK",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (title, record) => {
        const isDone = record.status?.toLowerCase() === "completed";
        return (
          <span
            className={`text-sm font-semibold ${
              isDone
                ? "text-text-placeholder line-through"
                : "text-text-primary"
            }`}
          >
            {title}
          </span>
        );
      },
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      width: 120,
      align: "center",
      render: (priority) => {
        const key = priority?.toLowerCase() || "low";
        const badge = priorityConfig[key] || priorityConfig.low;
        return (
          <Tag
            bordered={false}
            className={`${badge.bg} ${badge.text} font-bold text-[10px] rounded px-2 py-0 m-0 tracking-wide uppercase`}
          >
            {priority || "low"}
          </Tag>
        );
      },
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      align: "center",
      render: (date) => (
        <span className="text-sm text-text-muted">
          {date && dayjs(date).isValid() ? dayjs(date).format("MMM DD, YYYY") : "—"}
        </span>
      ),
    },
    {
      title: "DUE DATE",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 140,
      align: "center",
      render: (date, record) => {
        const isDone = record.status?.toLowerCase() === "completed";
        return (
          <span
            className={
              isDone
                ? "text-sm text-text-placeholder line-through"
                : "text-sm text-text-primary"
            }
          >
            {date && dayjs(date).isValid() ? dayjs(date).format("MMM DD, YYYY") : "—"}
          </span>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 130,
      align: "center",
      render: (status) => {
        const key = status?.toLowerCase() || "pending";
        const badge = statusConfig[key] || statusConfig.pending;
        const display = key === "completed" ? "Completed" : "Pending";
        return (
          <Tag
            bordered={false}
            className={`${badge.bg} ${badge.text} font-semibold text-[11px] rounded px-2.5 py-0 m-0`}
          >
            {display}
          </Tag>
        );
      },
    },
  ];

  return (
    <div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className="text-xl font-extrabold text-text-primary font-manrope"
            style={{ fontStyle: "italic" }}
          >
            All Todos
          </span>
          <span className="text-xs text-text-muted font-manrope">
            {filteredTodos.length} results
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <Input
            prefix={<SearchOutlined className="text-text-placeholder" />}
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[240px] rounded-lg border-border"
            allowClear
          />

          <div className="flex items-center gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`
                  cursor-pointer rounded-lg border-0 px-3.5 py-1.5
                  text-xs font-bold font-manrope transition-colors
                  ${
                    activeFilter === tab.key
                      ? "bg-primary text-primary-text"
                      : "bg-transparent text-text-secondary hover:bg-surface-secondary"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTodos}
        rowKey={(record) => record._id || record.key}
        loading={loading}
        pagination={{
          pageSize: 6,
          showTotal: (total, range) =>
            `Showing ${range[0]}–${range[1]} of ${total} todos`,
          size: "default",
        }}
        rowClassName={(record) =>
          record.status?.toLowerCase() === "completed" ? "opacity-60" : ""
        }
        className="rounded-xl overflow-hidden border border-border bg-surface"
        size="middle"
      />
    </div>
  );
}

export default TodosTable;
