import { Table, Tag, Tooltip, Button } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const priorityConfig = {
  high: { bg: "bg-primary", text: "text-primary-text" },
  medium: { bg: "bg-amber-600", text: "text-white" },
  low: { bg: "bg-success", text: "text-primary-text" },
};

const statusConfig = {
  pending: { bg: "bg-amber-100", text: "text-amber-700" },
  completed: { bg: "bg-success-bg", text: "text-success" },
};

function SharedTodoTable({ todos = [], onView, onToggleComplete, loading = false }) {
  const columns = [
    {
      title: "TASK",
      key: "title",
      ellipsis: true,
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (_, record) => {
        const title = record.todoId?.title || record.title;
        const subtitle = record.todoId?.description || record.subtitle || record.description;
        const status = (record.todoId?.status || record.status)?.toLowerCase();
        const isDone = status === "completed" || record.completed;

        return (
          <div>
            <span
              className={`text-sm font-semibold block leading-tight ${
                isDone
                  ? "text-text-placeholder line-through"
                  : "text-text-primary"
              }`}
            >
              {title}
            </span>
            {subtitle && (
              <span className="text-xs text-text-muted truncate block mt-0.5 max-w-[320px]">
                {subtitle}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "SHARED BY",
      key: "sharedBy",
      width: 200,
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (_, record) => {
        const author = record.sharedBy || record.author;
        const photo = author?.profilePhoto || author?.avatar;
        const name = author?.name || "Team Member";
        const email = author?.email || "";

        return (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-secondary text-primary font-bold text-xs shrink-0 overflow-hidden">
              {photo ? (
                <img
                  src={photo}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserOutlined className="text-[11px]" />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-text-primary block truncate">
                {name}
              </span>
              <span className="text-[10px] text-text-muted block truncate">
                {email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      key: "status",
      width: 120,
      align: "center",
      render: (_, record) => {
        const rawStatus = (record.todoId?.status || record.status)?.toLowerCase() || "pending";
        const badge = statusConfig[rawStatus] || statusConfig.pending;
        const display = rawStatus === "completed" ? "Completed" : "Pending";
        return (
          <Tag
            bordered={false}
            className={`${badge.bg} ${badge.text} font-bold text-[10px] rounded px-2.5 py-0.5 m-0`}
          >
            {display}
          </Tag>
        );
      },
    },
    {
      title: "PRIORITY",
      key: "priority",
      width: 110,
      align: "center",
      render: (_, record) => {
        const rawPriority = (record.todoId?.priority || record.priority)?.toLowerCase() || "low";
        const badge = priorityConfig[rawPriority] || priorityConfig.low;
        return (
          <Tag
            bordered={false}
            className={`${badge.bg} ${badge.text} font-bold text-[10px] rounded px-2 py-0 m-0 tracking-wide uppercase`}
          >
            {rawPriority}
          </Tag>
        );
      },
    },
    {
      title: "DUE DATE",
      key: "dueDate",
      width: 140,
      align: "center",
      render: (_, record) => {
        const dueDate = record.todoId?.dueDate || record.dueDate;
        const formatted = dueDate && dayjs(dueDate).isValid()
          ? dayjs(dueDate).format("MMM DD, YYYY")
          : "No date";
        return (
          <span className="text-xs text-text-secondary flex items-center justify-center gap-1.5 font-medium whitespace-nowrap">
            <CalendarOutlined className="text-text-muted" />
            {formatted}
          </span>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 110,
      align: "center",
      render: (_, record) => {
        const status = (record.todoId?.status || record.status)?.toLowerCase();
        const isDone = status === "completed" || record.completed;

        return (
          <div className="flex items-center justify-center gap-1.5">
            <Tooltip
              title={
                isDone ? "Mark as Incomplete" : "Mark as Completed"
              }
            >
              <Button
                type="text"
                size="small"
                onClick={() => onToggleComplete?.(record)}
                icon={
                  <CheckCircleOutlined
                    className={
                      isDone
                        ? "text-success text-base"
                        : "text-text-muted hover:text-success text-base"
                    }
                  />
                }
              />
            </Tooltip>

            <Tooltip title="View Task Details">
              <Button
                type="text"
                size="small"
                onClick={() => onView?.(record)}
                icon={
                  <EyeOutlined className="text-text-muted hover:text-text-primary text-base" />
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={todos}
      rowKey={(record) => record._id || record.key}
      loading={loading}
      pagination={{
        pageSize: 6,
        showTotal: (total, range) =>
          `Showing ${range[0]} of ${total} shared entries`,
        size: "default",
      }}
      rowClassName={(record) => {
        const status = (record.todoId?.status || record.status)?.toLowerCase();
        return status === "completed" || record.completed ? "opacity-60" : "";
      }}
      className="rounded-2xl overflow-hidden border border-border bg-surface"
      size="middle"
      scroll={{ x: 850 }}
    />
  );
}

export default SharedTodoTable;
