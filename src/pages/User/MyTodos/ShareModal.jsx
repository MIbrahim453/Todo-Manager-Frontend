import { useState, useEffect, useContext } from "react";
import { Modal, Input, Checkbox, Button, Typography, Empty, Spin } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../../context/userContext";
import { AuthContext } from "../../../context/authContext";
import { TodoContext } from "../../../context/todoContext";
import useAntdMessage from "../../../hooks/useAntdMessage";

const { Text } = Typography;

function ShareModal({ open, onClose, todoId }) {
  const { allUsers, getAllUsers, loading: usersLoading } = useContext(UserContext);
  const { user: currentUser } = useContext(AuthContext);
  const { shareTodo } = useContext(TodoContext);
  const { messageApi, contextHolder } = useAntdMessage();

  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedUserIds([]);
      setSearch("");
      if (!allUsers || allUsers.length === 0) {
        getAllUsers?.();
      }
    }
  }, [open]);

  const otherUsers = (allUsers || []).filter(
    (u) => u._id !== currentUser?._id
  );

  const filteredUsers = otherUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    if (selectedUserIds.length === 0) {
      messageApi.warning("Please select at least one user to share with");
      return;
    }
    setSharing(true);
    try {
      const res = await shareTodo(todoId, selectedUserIds);
      if (res?.success) {
        messageApi.success(res.message || "Todo shared successfully!");
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        messageApi.error(res?.message || "Failed to share todo");
      }
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Failed to share todo");
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={480}
        title={
          <div>
            <h3 className="text-base font-bold text-text-primary m-0">
              Share Task
            </h3>
            <p className="text-xs text-text-muted m-0 mt-0.5">
              Select team members to collaborate on this task
            </p>
          </div>
        }
      >
        <div className="py-3">
          <Input
            prefix={<SearchOutlined className="text-text-placeholder" />}
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 h-10 rounded-lg border-border"
            allowClear
          />

          <div className="max-h-64 overflow-y-auto divide-y divide-border border border-border rounded-lg">
            {usersLoading ? (
              <div className="py-8 text-center">
                <Spin />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-6">
                <Empty
                  description={
                    <span className="text-xs text-text-muted">
                      No users found
                    </span>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isChecked = selectedUserIds.includes(u._id);
                return (
                  <div
                    key={u._id}
                    onClick={() => toggleUser(u._id)}
                    className="flex items-center justify-between p-3 hover:bg-surface-secondary cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 overflow-hidden">
                        {u.profilePhoto ? (
                          <img
                            src={u.profilePhoto}
                            alt={u.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserOutlined />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-text-primary truncate">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-text-muted truncate">
                          {u.email}
                        </div>
                      </div>
                    </div>
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleUser(u._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-2 text-xs text-text-muted">
            Selected: <span className="font-bold">{selectedUserIds.length}</span> user(s)
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleShare}
              loading={sharing}
              disabled={selectedUserIds.length === 0}
              className="bg-primary hover:bg-primary-hover font-semibold"
            >
              Share Task
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareModal;
