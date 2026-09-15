import { Table, Tag, Tooltip, Button } from "antd";
import {
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
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

function TodoTable({
  todos = [],
  onView,
  onEdit,
  onToggleComplete,
  onDelete,
  onShare,
}) {
  const columns = [
    {
      title: "TASK",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      onHeaderCell: () => ({ style: { textAlign: "center" } }),
      render: (title, record) => {
        const isDone = record.status === "completed" || record.completed;
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
      width: 110,
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => {
        const key = status?.toLowerCase() || "pending";
        const badge = statusConfig[key] || statusConfig.pending;
        const displayStatus = key === "completed" ? "Completed" : "Pending";
        return (
          <Tag
            bordered={false}
            className={`${badge.bg} ${badge.text} font-semibold text-[11px] rounded px-2.5 py-0 m-0`}
          >
            {displayStatus}
          </Tag>
        );
      },
    },
    {
      title: "DUE DATE",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 160,
      align: "center",
      render: (dueDate, record) => {
        const isDone = record.status === "completed" || record.completed;
        const formattedDate = dueDate
          ? dayjs(dueDate).isValid()
            ? dayjs(dueDate).format("MMM DD, YYYY")
            : dueDate
          : "No date";
        return (
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium">
            <CalendarOutlined
              className={isDone ? "text-text-placeholder" : "text-primary"}
            />
            <span
              className={
                isDone
                  ? "text-text-placeholder line-through"
                  : "text-text-primary"
              }
            >
              {formattedDate}
            </span>
          </div>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 180,
      align: "center",
      render: (_, record) => {
        const isDone = record.status === "completed" || record.completed;
        return (
          <div className="flex items-center justify-center gap-1">
            <Tooltip
              title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
            >
              <Button
                type="text"
                size="small"
                onClick={() => onToggleComplete?.(record)}
                icon={
                  <CheckCircleOutlined
                    className={
                      isDone
                        ? "text-success"
                        : "text-text-muted hover:text-success"
                    }
                  />
                }
              />
            </Tooltip>
            <Tooltip title="View">
              <Button
                type="text"
                size="small"
                onClick={() => onView?.(record)}
                icon={
                  <EyeOutlined className="text-text-muted hover:text-text-primary" />
                }
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                type="text"
                size="small"
                onClick={() => onEdit?.(record)}
                icon={
                  <EditOutlined className="text-text-muted hover:text-text-primary" />
                }
              />
            </Tooltip>
            <Tooltip title="Share">
              <Button
                type="text"
                size="small"
                onClick={() => onShare?.(record)}
                icon={
                  <ShareAltOutlined className="text-text-muted hover:text-text-primary" />
                }
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                size="small"
                danger
                onClick={() => onDelete?.(record)}
                icon={<DeleteOutlined />}
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
      pagination={{
        pageSize: 6,
        showTotal: (total, range) =>
          `Showing ${range[0]} of ${total} active & completed entries`,
        size: "default",
      }}
      rowClassName={(record) =>
        record.status === "completed" || record.completed ? "opacity-60" : ""
      }
      className="rounded-xl overflow-hidden border border-border bg-surface"
      size="middle"
    />
  );
}

export default TodoTable;
