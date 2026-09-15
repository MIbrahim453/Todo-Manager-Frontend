import { Card, Button, Divider, Form, Typography, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import useAntdMessage from "../../hooks/useAntdMessage.jsx";
import OAuth from "./OAuth";

const { Title, Text } = Typography;

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { messageApi, contextHolder } = useAntdMessage();

  const handleSubmit = async (values) => {
    try {
      const result = await login(values.email, values.password);
      if (result.success) {
        messageApi.success(result.message || "User Login successful");
        form.resetFields();
      } else {
        messageApi.error(result.message || "Login failed");
      }

      if (result.data.user.role === "member") {
        navigate("/user/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      {contextHolder}
      <div className="min-h-screen w-full overflow-hidden flex flex-col justify-center items-center font-manrope! bg-background! p-5!">
        <div className="text-center mb-6">
          <Title level={2} className="font-bold!">
            Welcome Back
          </Title>
          <Text className="font-semibold!">
            Sign in to your Todo Manager desk.
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
            <div className="flex justify-end mb-4">
              <Link
                to="/forget-password"
                className="text-primary! font-semibold!"
              >
                Forgot Password?
              </Link>
            </div>
            <Form.Item>
              <Button
                className="bg-primary! font-semibold! hover:bg-surface-secondary! hover:text-primary!"
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Divider className="my-5! text-text-muted!">or</Divider>
          <OAuth />
          <div className="flex justify-center items-center gap-2 mt-4">
            <Text type="secondary" className="font-semibold!">
              Don't have an account?
            </Text>
            <Link to="/sign-up" className="text-primary! font-semibold!">
              SignUp
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Login;
