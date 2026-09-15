import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import {
  CloseOutlined,
  CalendarOutlined,
  FlagOutlined,
  AlignLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

function TodoModal({
  open,
  onClose,
  mode = "create",
  todo = null,
  onSubmit,
  loading = false,
}) {
  const [form] = Form.useForm();
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const titleText = isView
    ? "Todo Details"
    : isEdit
    ? "Edit Todo"
    : "Create New Todo";

  const subtitleText = isView
    ? "View task details and specifications"
    : isEdit
    ? "Update task details, status, or assignment"
    : "Add a personal or shared task to your list";

  useEffect(() => {
    if (open) {
      if (todo) {
        form.setFieldsValue({
          title: todo.title || "",
          description: todo.description || todo.subtitle || "",
          priority: todo.priority?.toLowerCase() || "medium",
          status: todo.status?.toLowerCase() || "pending",
          dueDate:
            todo.dueDate && dayjs(todo.dueDate).isValid()
              ? dayjs(todo.dueDate)
              : null,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          priority: "medium",
          status: "pending",
        });
      }
    }
  }, [open, todo, form]);

  const handleFinish = async (values) => {
    const formattedData = {
      title: values.title,
      description: values.description || "",
      priority: values.priority || "medium",
      status: values.status || "pending",
      dueDate: values.dueDate ? values.dueDate.toISOString() : new Date().toISOString(),
    };

    if (isEdit) {
      await onSubmit?.(todo._id, formattedData);
    } else {
      await onSubmit?.(formattedData);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={540}
      destroyOnClose
      styles={{
        content: {
          padding: 0,
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        },
      }}
    >

      <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-surface">
        <div>
          <h2 className="text-lg font-bold text-text-primary m-0 leading-tight">
            {titleText}
          </h2>
          <p className="text-xs text-text-muted m-0 mt-0.5">{subtitleText}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary border-0 bg-transparent cursor-pointer"
        >
          <CloseOutlined className="text-sm" />
        </button>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="px-6 py-4 bg-surface"
      >

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: !isView, message: "Please enter todo title" }]}
          className="mb-3.5 font-semibold"
        >
          <Input
            size="large"
            disabled={isView}
            placeholder="Enter todo title"
            className="bg-input-background! border-border! focus:border-primary! focus:shadow-none!"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="flex items-center gap-1.5">
              <AlignLeftOutlined className="text-text-muted" /> Description
            </span>
          }
          name="description"
          className="mb-3.5 font-semibold"
        >
          <TextArea
            rows={3}
            disabled={isView}
            placeholder="Add description or instructions..."
            className="bg-input-background! border-border! focus:border-primary! focus:shadow-none! resize-none"
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <Form.Item
            label={
              <span className="flex items-center gap-1.5">
                <FlagOutlined className="text-text-muted" /> Priority
              </span>
            }
            name="priority"
            className="mb-3.5 font-semibold"
          >
            <Select
              size="large"
              disabled={isView}
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="flex items-center gap-1.5">
                <CheckCircleOutlined className="text-text-muted" /> Status
              </span>
            }
            name="status"
            className="mb-3.5 font-semibold"
          >
            <Select
              size="large"
              disabled={isView}
              options={[
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="flex items-center gap-1.5">
              <CalendarOutlined className="text-text-muted" /> Due Date
            </span>
          }
          name="dueDate"
          rules={[{ required: !isView, message: "Please select a due date" }]}
          className="mb-4 font-semibold"
        >
          <DatePicker
            size="large"
            disabled={isView}
            format="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            className="w-full bg-input-background! border-border! focus:border-primary!"
          />
        </Form.Item>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
          <Button onClick={onClose} size="large">
            {isView ? "Close" : "Cancel"}
          </Button>
          {!isView && (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="bg-primary! hover:bg-primary-hover! font-semibold"
            >
              {isEdit ? "Save Changes" : "Create Todo"}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default TodoModal;
