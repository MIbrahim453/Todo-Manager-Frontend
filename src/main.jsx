import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import AuthProvider from "./context/authContext.jsx";
import UserProvider from "./context/userContext.jsx";
import TodoProvider from "./context/todoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider
      theme={{
        token: {
          fontFamily: "Manrope, sans-serif",
          colorPrimary: "#e34432",
          colorLink: "#e34432",
          colorLinkHover: "#cf3520",
          colorLinkActive: "#a82414",
          colorSuccess: "#446c3d",
          colorInfo: "#0f66ae",
          colorError: "#ba1a1a",
          colorText: "#25221e",
          colorTextSecondary: "#4a4744",
          colorBorder: "#d7d6d4",
          colorBgElevated: "#ffffff",
        },
        components: {
          Button: {
            colorPrimary: "#e34432",
            colorPrimaryHover: "#cf3520",
            colorPrimaryActive: "#a82414",
          },
          Card: {
            colorBorderSecondary: "#d7d6d4",
            colorBgContainer: "#ffffff",
          },
          Layout: {
            headerBg: "#fefdfc",
            footerBg: "#fefdfc",
            bodyBg: "#fefdfc",
          },
          Typography: {
            colorText: "#25221e",
            colorTextHeading: "#25221e",
            colorTextDescription: "#4a4744",
            colorLink: "#e34432",
            colorLinkHover: "#cf3520",
            colorLinkActive: "#a82414",
          },
          Message: {
            contentBg: "#ffffff",
          },
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
              <TodoProvider>
                <App />
              </TodoProvider>
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
