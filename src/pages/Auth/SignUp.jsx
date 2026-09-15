import { Card, Button, Divider, Form, Typography, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import useAntdMessage from "../../hooks/useAntdMessage.jsx";
import OAuth from "./OAuth";

const { Title, Text } = Typography;

function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { signUp, loading } = useContext(AuthContext);
  const { messageApi, contextHolder } = useAntdMessage();

  const handleSubmit = async (values) => {
    try {
      const result = await signUp(values.name, values.email, values.password);
      if (result?.success) {
        messageApi.success(result.message || "Account created successfully");
        form.resetFields();
        navigate("/login");
      } else {
        messageApi.error(result?.message || "Signup failed");
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen w-full flex flex-col justify-center items-center overflow-hidden font-manrope! bg-background! p-5!">
      <div className="text-center mb-6">
        <Title level={2} className="font-bold!">
          Join Now
        </Title>
        <Text className="font-semibold!">
          Start organizing your desk, personal ledgers, and shared team todos
        </Text>
      </div>
      <Card className="w-full max-w-md bg-surface!">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
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
              className="bg-input-background! border-border! focus:border-primary! focus:shadow-none!"
              placeholder="Enter Your Name"
              size="large"
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
              className="bg-input-background! border-border! focus:border-primary! focus:shadow-none!"
              size="large"
              placeholder="Enter Your Email"
            />
          </Form.Item>
          <Form.Item
            className="font-semibold"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 6,
                message: "Password must be minimum 6 characters",
              },
            ]}
          >
            <Input.Password
              className="bg-input-background! border-border! focus-within:border-primary! focus-within:shadow-none!"
              size="large"
              placeholder="Enter Your Password"
            />
          </Form.Item>
          <Form.Item
            className="font-semibold"
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Password not matched");
                },
              }),
            ]}
          >
            <Input.Password
              className="bg-input-background! border-border! focus-within:border-primary! focus-within:shadow-none!"
              size="large"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-primary! font-semibold! hover:bg-surface-secondary! hover:text-primary!"
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <Divider className="my-5! text-text-muted!">or</Divider>
        <OAuth />
        <div className="flex justify-center items-center gap-2 mt-4">
          <Text type="secondary" className="font-semibold!">
            Already have an account?
          </Text>
          <Link to="/login" className="text-primary! font-semibold!">
            Login
          </Link>
        </div>
      </Card>
    </div>
    </>
  );
}

export default SignUp;
