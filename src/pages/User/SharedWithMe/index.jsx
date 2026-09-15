import { useState, useEffect, useContext } from "react";
import { Typography, Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SharedStatsCards from "./SharedStatsCards";
import SharedTodoTable from "./SharedTodoTable";
import TodoModal from "../MyTodos/TodoModal";
import { TodoContext } from "../../../context/todoContext";
import useAntdMessage from "../../../hooks/useAntdMessage";

const { Title, Paragraph } = Typography;

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function SharedWithMe() {
  const {
    sharedTodos,
    sharedTodoStats,
    getSharedTodos,
    markSharedTodoCompleted,
    loading,
  } = useContext(TodoContext);

  const { messageApi, contextHolder } = useAntdMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    getSharedTodos?.();
  }, []);

  const rawList = Array.isArray(sharedTodos) ? sharedTodos : [];

  const filteredTodos = rawList.filter((item) => {
    const title = item.todoId?.title || item.title || "";
    const desc = item.todoId?.description || item.subtitle || item.description || "";
    const authorName = item.sharedBy?.name || item.author?.name || "";
    const status = (item.todoId?.status || item.status)?.toLowerCase() || "pending";
    const priority = (item.todoId?.priority || item.priority)?.toLowerCase() || "low";

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        authorName.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (statusFilter !== "all" && status !== statusFilter) return false;

    if (priorityFilter !== "all" && priority !== priorityFilter) return false;

    return true;
  });

  const handleToggleComplete = async (record) => {
    const todoId = record.todoId?._id || record._id;
    const currentStatus =
      (record.todoId?.status || record.status)?.toLowerCase() || "pending";
    try {
      const res = await markSharedTodoCompleted(todoId, currentStatus);
      if (res?.success) {
        await getSharedTodos?.();
        messageApi.success(res.message || "Shared task status updated!");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const handleView = (record) => {
    const viewItem = {
      ...record,
      title: record.todoId?.title || record.title,
      description: record.todoId?.description || record.subtitle || record.description,
      priority: record.todoId?.priority || record.priority,
      status: record.todoId?.status || record.status,
      dueDate: record.todoId?.dueDate || record.dueDate,
    };
    setSelectedTodo(viewItem);
    setIsModalOpen(true);
  };

  return (
    <>
      {contextHolder}
      <div className="font-manrope">

        <div className="mb-6">
          <Title level={2} className="mb-0 font-extrabold text-text-primary m-0">
            Shared With Me
          </Title>
          <Paragraph className="text-xs text-text-muted m-0 mt-1">
            Collaborative tasks and ledgers shared with you by your team members
          </Paragraph>
        </div>

        <SharedStatsCards
          total={sharedTodoStats?.total || rawList.length}
          pending={sharedTodoStats?.pending || 0}
          completed={sharedTodoStats?.completed || 0}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <Input
            placeholder="Search shared tasks or team members..."
            prefix={<SearchOutlined className="text-text-placeholder" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-[360px] border-border rounded-lg h-10"
            allowClear
          />

          <Space size={12} wrap>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-[140px]"
              popupMatchSelectWidth={false}
            />
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={priorityOptions}
              className="min-w-[140px]"
              popupMatchSelectWidth={false}
            />
          </Space>
        </div>

        <SharedTodoTable
          todos={filteredTodos}
          loading={loading}
          onView={handleView}
          onToggleComplete={handleToggleComplete}
        />

        <TodoModal
          open={isModalOpen}
          mode="view"
          todo={selectedTodo}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default SharedWithMe;
