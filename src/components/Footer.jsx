import { Col, Divider, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className="bg-background! px-6! py-12! sm:px-10! border-t! border-border! font-manrope!">
      <div className="mx-auto! max-w-7xl!">
        <Row gutter={[48, 48]} justify="space-between">
          <Col xs={24} md={8}>
            <Link to="/" className="mb-3! flex! items-center! gap-3!">
              <img src={logo} alt="Task Manager" className="h-10! w-10! object-contain!" />
              <span className="font-manrope! text-xl! font-bold! tracking-tight! text-text-primary!">
                Task Manager
              </span>
            </Link>
            <p className="max-w-xs! font-manrope! text-sm! text-text-secondary! leading-relaxed!">
              Plan your day, stay focused, and get more done.
            </p>
          </Col>

          <Col xs={24} md={14}>
            <Row gutter={[32, 32]}>
              <Col xs={8} sm={8}>
                <h3 className="mb-4! font-manrope! text-sm! font-bold! text-text-primary!">
                  Explore
                </h3>
                <div className="flex! flex-col! gap-3! font-manrope! text-sm!">
                  <a
                    href="#features"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    Features
                  </a>
                  <a
                    href="#work"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonial"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    Testimonials
                  </a>
                </div>
              </Col>

              <Col xs={8} sm={8}>
                <h3 className="mb-4! font-manrope! text-sm! font-bold! text-text-primary!">
                  Account
                </h3>
                <div className="flex! flex-col! gap-3! font-manrope! text-sm!">
                  <Link
                    to="/login"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    Get started
                  </Link>
                </div>
              </Col>

              <Col xs={8} sm={8}>
                <h3 className="mb-4! font-manrope! text-sm! font-bold! text-text-primary!">
                  Support
                </h3>
                <div className="flex! flex-col! gap-3! font-manrope! text-sm!">
                  <Link
                    to="/forget-password"
                    className="text-text-secondary! transition-colors! hover:text-primary!"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="mt-12! border-t! border-border! pt-8!">
          <p className="font-manrope! text-xs! text-text-placeholder!">
            © 2026 Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </AntFooter>
  );
}

export default Footer;
