import { Layout, Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { useEffect, useState } from "react";

const { Header } = Layout;

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#work" },
  { label: "Testimonial", href: "#testimonial" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      className={`flex justify-between items-center bg-background! px-4 sm:px-6 md:px-10 py-3 sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Todo Manager" className="w-10 h-10" />
          <h1 className="text-xl sm:text-2xl text-text-primary font-manrope font-semibold">
            Task Manager
          </h1>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-10 font-manrope font-medium">
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="text-text-primary hover:text-text-muted"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-6 font-manrope font-medium">
        <Link
          to="/login"
          className="inline-flex items-center justify-center text-text-primary hover:bg-gray-100 px-4 py-2 rounded-md transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="inline-flex items-center justify-center bg-primary text-primary-text hover:bg-primary-hover px-4 py-2 rounded-md transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
      <div className="flex md:hidden items-center">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 22 }} />}
          onClick={toggleNavbar}
          className="flex items-center justify-center text-text-primary!"
          aria-label="Open menu"
        />
      </div>
      <Drawer
        title={
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeDrawer}
          >
            <img src={logo} alt="Todo Manager" className="w-8 h-8" />
            <span className="text-lg text-text-primary font-manrope font-semibold">
              Task Manager
            </span>
          </Link>
        }
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={280}
        closeIcon={<CloseOutlined style={{ fontSize: 18, color: "#25221e" }} />}
        styles={{
          body: {
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          },
          header: { borderBottom: "1px solid #d7d6d4" },
        }}
      >
        <nav className="flex flex-col gap-1 font-manrope font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="text-text-primary hover:text-text-muted hover:bg-surface-secondary px-3 py-2.5 rounded-md transition-all duration-200"
              href={link.href}
              onClick={closeDrawer}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-border my-2" />
        <div className="flex flex-col gap-3 font-manrope font-medium">
          <Link
            to="/login"
              className="text-text-primary hover:bg-gray-100 px-3 py-2.5 rounded-md text-center transition-all duration-300"
            onClick={closeDrawer}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
              className="bg-primary text-primary-text hover:bg-primary-hover px-3 py-2.5 rounded-md text-center transition-all duration-300"
            onClick={closeDrawer}
          >
            Get Started
          </Link>
        </div>
      </Drawer>
    </Header>
  );
}

export default Navbar;
