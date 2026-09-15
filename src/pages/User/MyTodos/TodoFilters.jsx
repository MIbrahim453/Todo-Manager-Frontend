import { Input, Select, Button, Space } from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

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

function TodoFilters({
  search = "",
  onSearchChange,
  status = "all",
  onStatusChange,
  priority = "all",
  onPriorityChange,
  sortAsc = true,
  onToggleSort,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
      <Input
        placeholder="Search todos..."
        prefix={<SearchOutlined className="text-text-placeholder" />}
        value={search}
        onChange={(e) => onSearchChange?.(e.target.value)}
        className="max-w-[360px] border-border rounded-lg h-10"
        allowClear
      />

      <Space size={12} wrap>
        <Select
          value={status}
          onChange={onStatusChange}
          options={statusOptions}
          className="min-w-[140px]"
          popupMatchSelectWidth={false}
        />
        <Select
          value={priority}
          onChange={onPriorityChange}
          options={priorityOptions}
          className="min-w-[140px]"
          popupMatchSelectWidth={false}
        />
        <Button
          icon={sortAsc ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
          onClick={onToggleSort}
        >
          Sort: Due Date
        </Button>
      </Space>
    </div>
  );
}

export default TodoFilters;
