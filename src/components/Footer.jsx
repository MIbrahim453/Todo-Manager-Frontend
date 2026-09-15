import { Col, Divider, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

function Footer() {
  return (
    <AntFooter className="border-t border-border bg-background px-6 py-12 font-manrope sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <Link to="/" className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="Task Manager" className="h-9 w-9 object-contain" />
              <span className="font-manrope text-xl font-bold tracking-tight text-text-primary">
                Task Manager
              </span>
            </Link>
            <p className="max-w-sm font-manrope text-sm text-text-secondary">
              Plan your day, stay focused, and get more done.
            </p>
          </Col>

          <Col xs={12} sm={8} md={5}>
            <h3 className="mb-4 font-manrope text-base font-semibold text-text-primary">
              Explore
            </h3>
            <div className="flex flex-col gap-2.5 font-manrope text-sm">
              <a
                href="#features"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                Features
              </a>
              <a
                href="#work"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                How It Works
              </a>
              <a
                href="#testimonial"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                Testimonials
              </a>
            </div>
          </Col>

          <Col xs={12} sm={8} md={5}>
            <h3 className="mb-4 font-manrope text-base font-semibold text-text-primary">
              Account
            </h3>
            <div className="flex flex-col gap-2.5 font-manrope text-sm">
              <Link
                to="/login"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                Get started
              </Link>
            </div>
          </Col>

          <Col xs={24} sm={8} md={4}>
            <h3 className="mb-4 font-manrope text-base font-semibold text-text-primary">
              Support
            </h3>
            <Link
              to="/forget-password"
              className="font-manrope text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Forgot password?
            </Link>
          </Col>
        </Row>

        <div className="my-8 border-t border-border" />
        <p className="font-manrope text-sm text-text-muted">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
      </div>
    </AntFooter>
  );
}

export default Footer;
