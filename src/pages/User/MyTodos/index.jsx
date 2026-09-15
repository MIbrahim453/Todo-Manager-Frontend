import { useState, useContext } from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import TodoFilters from "./TodoFilters";
import TodoTable from "./TodoTable";
import TodoModal from "./TodoModal";
import ShareModal from "./ShareModal";
import { TodoContext } from "../../../context/todoContext";
import useAntdMessage from "../../../hooks/useAntdMessage";

const { Title } = Typography;

function MyTodos() {
  const {
    todos,
    loading,
    createTodo,
    editTodo,
    deleteTodo,
    markTodoCompleted,
  } = useContext(TodoContext);

  const { messageApi, contextHolder } = useAntdMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareTodoId, setShareTodoId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenView = (record) => {
    setModalMode("view");
    setSelectedTodo(record);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setModalMode("edit");
    setSelectedTodo(record);
    setIsModalOpen(true);
  };

  const handleOpenShare = (record) => {
    setShareTodoId(record._id);
    setIsShareOpen(true);
  };

  const handleModalSubmit = async (...args) => {
    setModalLoading(true);
    try {
      if (modalMode === "edit") {
        const [id, data] = args;
        const res = await editTodo(id, data);
        if (res?.success) {
          messageApi.success(res.message || "Todo updated successfully!");
          setIsModalOpen(false);
        } else {
          messageApi.error(res?.message || "Failed to update todo");
        }
      } else {
        const [data] = args;
        const res = await createTodo(data);
        if (res?.success) {
          messageApi.success(res.message || "Todo created successfully!");
          setIsModalOpen(false);
        } else {
          messageApi.error(res?.message || "Failed to create todo");
        }
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Operation failed");
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggleComplete = async (record) => {
    try {
      const currentStatus = record.status?.toLowerCase() || "pending";
      const res = await markTodoCompleted(record._id, currentStatus);
      if (res?.success) {
        messageApi.success(res.message || "Todo status updated!");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (record) => {
    try {
      const res = await deleteTodo(record._id);
      if (res?.success) {
        messageApi.success(res.message || "Todo deleted successfully!");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to delete todo");
    }
  };

  const rawTodos = Array.isArray(todos) ? todos : [];

  const filteredTodos = rawTodos
    .filter((item) => {

      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }

      const itemStatus = item.status?.toLowerCase() || "pending";
      if (status !== "all" && itemStatus !== status) return false;

      const itemPriority = item.priority?.toLowerCase() || "medium";
      if (priority !== "all" && itemPriority !== priority) return false;

      return true;
    })
    .sort((a, b) => {
      const dateA = dayjs(a.dueDate).isValid() ? dayjs(a.dueDate).valueOf() : 0;
      const dateB = dayjs(b.dueDate).isValid() ? dayjs(b.dueDate).valueOf() : 0;
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  return (
    <>
      {contextHolder}
      <div className="font-manrope">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Title level={2} className="mb-0 font-extrabold text-text-primary m-0">
              My Todos
            </Title>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleOpenCreate}
            className="bg-primary border-primary font-bold rounded-[10px] shadow-none hover:bg-primary-hover"
          >
            Add Todo
          </Button>
        </div>

        <TodoFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
          sortAsc={sortAsc}
          onToggleSort={() => setSortAsc((prev) => !prev)}
        />

        <TodoTable
          todos={filteredTodos}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onShare={handleOpenShare}
        />

        <TodoModal
          open={isModalOpen}
          mode={modalMode}
          todo={selectedTodo}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          loading={modalLoading}
        />

        <ShareModal
          open={isShareOpen}
          onClose={() => {
            setIsShareOpen(false);
            setShareTodoId(null);
          }}
          todoId={shareTodoId}
        />
      </div>
    </>
  );
}

export default MyTodos;
