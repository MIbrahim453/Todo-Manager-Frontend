import { useContext } from "react";
import { Card, List, Tag, Typography, Empty, Button, Tooltip } from "antd";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { TodoContext } from "../../../context/todoContext";

const { Text } = Typography;

const priorityConfig = {
  high: { color: "#e34432", bg: "#ffdad6" },
  medium: { color: "#b45309", bg: "#fef3c7" },
  low: { color: "#446c3d", bg: "#f0f6df" },
};

function TodaysTasks() {
  const { todos, markTodoCompleted, loading } = useContext(TodoContext);

  const rawTodos = Array.isArray(todos) ? todos : [];

  const sortedTodos = [...rawTodos].sort((a, b) => {
    const aDone = a.status?.toLowerCase() === "completed";
    const bDone = b.status?.toLowerCase() === "completed";
    if (aDone !== bDone) return aDone ? 1 : -1;
    return 0;
  });

  const activeCount = rawTodos.filter(
    (t) => t.status?.toLowerCase() !== "completed"
  ).length;

  return (
    <Card
      bordered
      style={{ borderColor: "#d7d6d4", borderRadius: 12 }}
      styles={{
        header: {
          borderBottom: "1px solid #d7d6d4",
          padding: "16px 24px",
          minHeight: "auto",
        },
        body: { padding: "4px 24px 20px" },
      }}
      title={
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span
              className="text-xl font-extrabold text-text-primary font-manrope"
              style={{ fontStyle: "italic" }}
            >
              Today's Tasks
            </span>
            <Text
              type="secondary"
              className="!text-xs !text-text-muted font-manrope"
            >
              {activeCount} active
            </Text>
          </div>
          <Text className="!text-xs !text-text-placeholder font-manrope">
            Active tasks first
          </Text>
        </div>
      }
    >
      {sortedTodos.length === 0 ? (
        <div className="py-8">
          <Empty
            description={
              <span className="text-xs text-text-muted">No tasks found</span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={sortedTodos}
          loading={loading}
          split
          renderItem={(task) => {
            const isCompleted = task.status?.toLowerCase() === "completed";
            const pKey = task.priority?.toLowerCase() || "low";
            const pBadge = priorityConfig[pKey] || priorityConfig.low;
            const timeStr = task.dueDate && dayjs(task.dueDate).isValid()
              ? dayjs(task.dueDate).format("MMM DD")
              : "";

            return (
              <List.Item
                style={{
                  padding: "14px 0",
                  borderBlockEnd: "1px solid #f4f3f0",
                }}
                extra={
                  <div className="flex items-center gap-2">
                    {task.priority && (
                      <Tag
                        bordered={false}
                        style={{
                          color: pBadge.color,
                          backgroundColor: pBadge.bg,
                          fontWeight: 700,
                          fontSize: 11,
                          borderRadius: 6,
                          margin: 0,
                          textTransform: "uppercase",
                          fontFamily: "Manrope, sans-serif",
                        }}
                      >
                        {task.priority}
                      </Tag>
                    )}
                    {timeStr && (
                      <Text className="!text-xs font-medium !text-text-muted font-manrope whitespace-nowrap">
                        {timeStr}
                      </Text>
                    )}
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Tooltip
                      title={
                        isCompleted ? "Mark incomplete" : "Mark completed"
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          markTodoCompleted?.(
                            task._id,
                            task.status?.toLowerCase() || "pending",
                          )
                        }
                        className="bg-transparent border-0 p-0 cursor-pointer flex items-center justify-center mt-0.5"
                      >
                        {isCompleted ? (
                          <CheckCircleFilled
                            style={{ fontSize: 20, color: "#446c3d" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              border: "2px solid #d7d6d4",
                            }}
                            className="hover:border-primary transition-colors"
                          />
                        )}
                      </button>
                    </Tooltip>
                  }
                  title={
                    <Text
                      className="!text-sm font-semibold font-manrope"
                      style={{
                        color: isCompleted ? "#94928f" : "#25221e",
                        textDecoration: isCompleted ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </Text>
                  }
                  description={
                    task.description ? (
                      <Text
                        className="!text-xs font-manrope"
                        ellipsis
                        style={{ color: "#6f6c69" }}
                      >
                        {task.description}
                      </Text>
                    ) : null
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
}

export default TodaysTasks;
