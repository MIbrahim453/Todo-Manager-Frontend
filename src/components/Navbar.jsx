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
      className={`sticky top-0 z-50 flex h-20 items-center justify-between border-b border-border bg-background px-6 transition-shadow duration-300 sm:px-10 lg:px-16 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
      style={{ lineHeight: "normal" }}
    >
      <div className="shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Todo Manager" className="h-9 w-9 object-contain" />
          <span className="font-manrope text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Task Manager
          </span>
        </Link>
      </div>

      <nav className="hidden items-center gap-8 font-manrope font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="text-text-secondary transition-colors hover:text-primary"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-4 font-manrope md:flex">
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-text transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          Get Started
        </Link>
      </div>

      <div className="flex items-center md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20, color: "#25221e" }} />}
          onClick={toggleNavbar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:bg-surface-secondary"
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
            <img src={logo} alt="Todo Manager" className="h-8 w-8 object-contain" />
            <span className="font-manrope text-lg font-bold text-text-primary">
              Task Manager
            </span>
          </Link>
        }
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={300}
        closeIcon={<CloseOutlined style={{ fontSize: 16, color: "#25221e" }} />}
        styles={{
          wrapper: { fontFamily: "Manrope, sans-serif" },
          content: { backgroundColor: "#fefdfc" },
          header: {
            backgroundColor: "#fefdfc",
            borderBottom: "1px solid #d7d6d4",
            padding: "16px 20px",
          },
          body: {
            backgroundColor: "#fefdfc",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          },
        }}
      >
        <nav className="flex flex-col gap-1.5 font-manrope font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="rounded-md px-3.5 py-2.5 text-base text-text-primary transition-colors hover:bg-surface-secondary hover:text-primary"
              href={link.href}
              onClick={closeDrawer}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="my-2 border-t border-border" />

        <div className="flex flex-col gap-3 font-manrope">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-center text-sm font-semibold text-text-primary transition-colors hover:bg-surface-secondary hover:text-primary"
            onClick={closeDrawer}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-text transition-colors hover:bg-primary-hover"
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
