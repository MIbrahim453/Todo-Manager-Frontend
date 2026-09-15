import { useContext } from "react";
import { Card, Col, Row } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { TodoContext } from "../../../context/todoContext";

function TodoStatCards() {
  const { allTodoStats } = useContext(TodoContext);

  const stats = [
    {
      label: "ALL TODOS",
      value: allTodoStats?.total ?? 0,
      icon: <FileTextOutlined style={{ fontSize: 20 }} />,
      iconBg: "#fff6f0",
      iconColor: "#4a4744",
    },
    {
      label: "PENDING TODOS",
      value: allTodoStats?.pending ?? 0,
      icon: <ClockCircleOutlined style={{ fontSize: 20 }} />,
      iconBg: "#ffdad6",
      iconColor: "#ba1a1a",
    },
    {
      label: "COMPLETED TODOS",
      value: allTodoStats?.completed ?? 0,
      icon: <CheckCircleOutlined style={{ fontSize: 20 }} />,
      iconBg: "#f0f6df",
      iconColor: "#446c3d",
    },
    {
      label: "SHARED TODOS",
      value: allTodoStats?.shared ?? 0,
      icon: <ShareAltOutlined style={{ fontSize: 20 }} />,
      iconBg: "#dceaff",
      iconColor: "#0f66ae",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => (
        <Col xs={12} sm={12} lg={6} key={stat.label}>
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

export default TodoStatCards;
