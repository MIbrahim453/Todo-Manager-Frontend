import { Col, Divider, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

function Footer() {
  return (
    <AntFooter className="border-t border-[#ece6df] bg-transparent px-6 py-12 font-manrope sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Row gutter={[32, 32]} justify="space-between">
          <Col xs={24} md={8}>
            <Link to="/" className="mb-2 flex items-center gap-2">
              <img src={logo} alt="Task Manager" className="h-7 w-7 object-contain" />
              <span className="font-manrope text-base font-bold tracking-tight text-text-primary">
                Task Manager
              </span>
            </Link>
            <p className="font-manrope text-xs text-text-muted">
              Plan your day, stay focused, and get more done.
            </p>
          </Col>

          <Col xs={24} md={14}>
            <Row gutter={[24, 24]}>
              <Col xs={8} sm={8}>
                <h3 className="mb-3 font-manrope text-xs font-bold text-text-primary">
                  Explore
                </h3>
                <div className="flex flex-col gap-2 font-manrope text-[11px]">
                  <a
                    href="#features"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    Features
                  </a>
                  <a
                    href="#work"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonial"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    Testimonials
                  </a>
                </div>
              </Col>

              <Col xs={8} sm={8}>
                <h3 className="mb-3 font-manrope text-xs font-bold text-text-primary">
                  Account
                </h3>
                <div className="flex flex-col gap-2 font-manrope text-[11px]">
                  <Link
                    to="/login"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    Get started
                  </Link>
                </div>
              </Col>

              <Col xs={8} sm={8}>
                <h3 className="mb-3 font-manrope text-xs font-bold text-text-primary">
                  Support
                </h3>
                <div className="flex flex-col gap-2 font-manrope text-[11px]">
                  <Link
                    to="/forget-password"
                    className="text-[#e34432]/80 transition-colors hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="mt-12">
          <p className="font-manrope text-[11px] text-text-placeholder">
            © 2026 Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </AntFooter>
  );
}

export default Footer;
