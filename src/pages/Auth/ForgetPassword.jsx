import { Card, Button, Form, Typography, Input } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

function ForgetPassword() {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center font-manrope! bg-background! p-5!">
      <div className="text-center mb-6">
        <Title level={2} className="font-bold!">
          Reset Your Password
        </Title>
        <Text className="font-semibold!">
          Enter your email and we&apos;ll send you a secure reset link.
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
          <Form.Item>
            <Button
              className="bg-primary! font-semibold!"
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
        <div className="bg-surface-secondary p-5 rounded-md flex gap-3">
          <div>
            <InfoCircleOutlined />
          </div>
          <Text className="text-text-secondary!">
            Reset links expire in 60 minutes and can only be used once.
          </Text>
        </div>
        <div className="flex justify-center items-center gap-2 mt-5">
          <Text type="secondary" className="font-semibold!">
            Remember your password?
          </Text>
          <Link to="/login" className="text-primary! font-semibold!">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default ForgetPassword;
