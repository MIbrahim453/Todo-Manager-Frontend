import { useContext } from "react";
import { Card, Col, Row } from "antd";
import {
  TeamOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../../context/userContext";

function UserStatCards() {
  const { allUsers, userTypeStats } = useContext(UserContext);

  const totalUsers =
    (userTypeStats?.adminUsers || 0) + (userTypeStats?.memberUsers || 0) ||
    (allUsers?.length || 0);

  const stats = [
    {
      label: "ALL USERS",
      value: totalUsers,
      icon: <TeamOutlined style={{ fontSize: 20 }} />,
      iconBg: "#dceaff",
      iconColor: "#0f66ae",
    },
    {
      label: "ADMIN USERS",
      value: userTypeStats?.adminUsers ?? 0,
      icon: <SafetyCertificateOutlined style={{ fontSize: 20 }} />,
      iconBg: "#f0f6df",
      iconColor: "#446c3d",
    },
    {
      label: "MEMBER USERS",
      value: userTypeStats?.memberUsers ?? 0,
      icon: <UserOutlined style={{ fontSize: 20 }} />,
      iconBg: "#fff6f0",
      iconColor: "#b45309",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col xs={24} sm={8} key={stat.label}>
          <Card
            bordered
            styles={{
              body: {
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "28px 24px",
              },
            }}
            style={{ borderColor: "#d7d6d4", borderRadius: 12 }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                backgroundColor: stat.iconBg,
                color: stat.iconColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="mb-0 text-[10px] font-bold uppercase tracking-[0.1em] text-text-placeholder font-manrope">
                {stat.label}
              </p>
              <p className="mb-0 text-2xl font-extrabold leading-tight text-text-primary font-manrope">
                {stat.value}
              </p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default UserStatCards;
