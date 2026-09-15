import { Col, Divider, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

function Footer() {
  return (
    <AntFooter className="bg-background! px-6! py-12! sm:px-10!">
      <div className="mx-auto max-w-7xl">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logo} alt="Task Manager" className="h-10 w-10" />
              <Title
                level={4}
                className="mb-0! text-text-primary! font-manrope!"
              >
                Task Manager
              </Title>
            </Link>
            <Text className="text-text-primary font-manrope!">
              Plan your day, stay focused, and get more done.
            </Text>
          </Col>

          <Col xs={12} sm={8} md={5}>
            <Title level={5} className="text-text-primary font-manrope!">
              Explore
            </Title>
            <div className="flex flex-col gap-3 font-manrope">
              <a
                href="#features"
                className="text-text-primary! hover:text-text-primary!"
              >
                Features
              </a>
              <a
                href="#work"
                className="text-text-primary! hover:text-text-primary!"
              >
                How It Works
              </a>
              <a
                href="#testimonial"
                className="text-text-primary! hover:text-text-primary!"
              >
                Testimonials
              </a>
            </div>
          </Col>

          <Col xs={12} sm={8} md={5}>
            <Title level={5} className="text-text-primary! font-manrope!">
              Account
            </Title>
            <div className="flex flex-col gap-3 font-manrope">
              <Link
                to="/login"
                className="text-text-primary! hover:text-text-primary!"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="text-text-primary! hover:text-text-primary!"
              >
                Get started
              </Link>
            </div>
          </Col>

          <Col xs={24} sm={8} md={4}>
            <Title level={5} className="text-text-primary! font-manrope!">
              Support
            </Title>
            <Link
              to="/forget-password"
              className="text-text-primary! hover:text-text-primary! font-manrope"
            >
              Forgot password?
            </Link>
          </Col>
        </Row>

        <Divider className="border-border!" />
        <Text className="text-text-primary! font-manrope!">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </Text>
      </div>
    </AntFooter>
  );
}

export default Footer;
