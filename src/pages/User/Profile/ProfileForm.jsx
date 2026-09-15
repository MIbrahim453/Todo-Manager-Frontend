import { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
  KeyOutlined,
} from "@ant-design/icons";

function ProfileForm({ profile, onSave, isEditing, onToggleEdit, loading = false }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: profile?.name || "",
      email: profile?.email || "",
    });
  }, [profile, isEditing, form]);

  const handleSubmit = (values) => {
    onSave?.(values);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 font-manrope">

      <div className="mb-6 pb-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary m-0 leading-tight">
            Personal Information
          </h3>
          <p className="text-xs text-text-muted m-0 mt-1">
            {isEditing
              ? "Edit your profile details below and save"
              : "View and manage your account credentials"}
          </p>
        </div>

        {!isEditing ? (
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={onToggleEdit}
            className="border-border! font-semibold! text-text-primary! hover:bg-surface-muted!"
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            type="default"
            icon={<CloseOutlined />}
            onClick={onToggleEdit}
            className="border-border! font-semibold! text-text-secondary! hover:bg-surface-muted!"
          >
            Cancel
          </Button>
        )}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        initialValues={{
          name: profile?.name || "",
          email: profile?.email || "",
        }}
      >

        <Form.Item
          className="font-semibold"
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            size="large"
            disabled={!isEditing}
            placeholder="Enter Your Name"
            className="bg-input-background! border-border! focus:border-primary! focus:shadow-none!"
          />
        </Form.Item>

        <Form.Item
          className="font-semibold"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input
            size="large"
            disabled={!isEditing}
            placeholder="Enter Your Email"
            className="bg-input-background! border-border! focus:border-primary! focus:shadow-none!"
          />
        </Form.Item>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Password
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-surface-secondary/40">
            <div className="flex items-center gap-2.5">
              <KeyOutlined className="text-text-muted text-base" />
              <div>
                <span className="text-sm font-semibold text-text-primary block">
                  ••••••••••••
                </span>
                <span className="text-xs text-text-muted block">
                  Change your password anytime
                </span>
              </div>
            </div>

            <Button
              type="default"
              onClick={() => navigate("/forget-password")}
              className="border-border! bg-surface! font-semibold! text-text-primary! hover:bg-surface-muted! hover:border-text-secondary!"
            >
              Change Password
            </Button>
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 flex justify-end gap-3 border-t border-border">
            <Button
              size="large"
              onClick={onToggleEdit}
              className="border-border! font-semibold! text-text-secondary! hover:bg-surface-muted!"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              icon={<CheckOutlined />}
              className="bg-primary! font-semibold! hover:bg-surface-secondary! hover:text-primary!"
            >
              Save Changes
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default ProfileForm;
