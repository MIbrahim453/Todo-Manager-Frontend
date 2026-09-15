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
          colorBgBase: "#fefdfc",
          colorBgContainer: "#ffffff",
          colorBgElevated: "#ffffff",
          colorBgLayout: "#fefdfc",
          borderRadius: 8,
        },
        components: {
          Button: {
            colorPrimary: "#e34432",
            colorPrimaryHover: "#cf3520",
            colorPrimaryActive: "#a82414",
            borderRadius: 8,
          },
          Card: {
            colorBorderSecondary: "#e8e2da",
            colorBgContainer: "#ffffff",
            borderRadiusLG: 16,
          },
          Layout: {
            headerBg: "#fefdfc",
            footerBg: "#fefdfc",
            bodyBg: "#fefdfc",
            siderBg: "#fefdfc",
          },
          Menu: {
            itemSelectedBg: "#fff6f0",
            itemSelectedColor: "#e34432",
            itemHoverBg: "#fff6f0",
            itemHoverColor: "#cf3520",
            itemColor: "#25221e",
          },
          Table: {
            headerBg: "#f7f2eb",
            headerColor: "#25221e",
            rowHoverBg: "#fff6f0",
            borderColor: "#e8e2da",
          },
          Input: {
            colorBgContainer: "#ffffff",
            colorBorder: "#d7d6d4",
            activeBorderColor: "#e34432",
            hoverBorderColor: "#e34432",
          },
          Select: {
            colorBgContainer: "#ffffff",
            colorBorder: "#d7d6d4",
            colorPrimary: "#e34432",
          },
          Modal: {
            contentBg: "#ffffff",
            headerBg: "#ffffff",
          },
          Tag: {
            borderRadius: 4,
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
