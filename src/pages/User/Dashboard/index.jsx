import { useContext, useEffect } from "react";
import { Button, Col, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StatCards from "./StatCards";
import TodaysTasks from "./TodaysTasks";
import { AuthContext } from "../../../context/authContext";
import { TodoContext } from "../../../context/todoContext";

const { Title, Text } = Typography;

function UserDashboard() {
  const { user } = useContext(AuthContext);
  const { getMyTodos } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMyTodos?.();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getFormattedDate = () => {
    return new Date()
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="font-manrope">
      <div className="mb-6">
        <Text className="!text-xs !font-bold !uppercase !tracking-[0.14em] !text-text-muted font-manrope">
          {getFormattedDate()}
        </Text>

        <Row
          justify="space-between"
          align="bottom"
          className="mt-1"
          gutter={[16, 12]}
        >
          <Col xs={24} sm={18}>
            <Title
              level={2}
              className="!mb-0 !text-2xl sm:!text-3xl !font-extrabold !text-text-primary font-manrope"
            >
              {getGreeting()}, {user?.name || "there"}
            </Title>
            <Text className="!text-sm !text-text-muted font-manrope mt-1 block">
              Here's what{" "}
              <span className="font-semibold text-primary underline underline-offset-2">
                needs your attention
              </span>{" "}
              today.
            </Text>
          </Col>
          <Col xs={24} sm={6} className="sm:text-right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate("/user/todos")}
              style={{
                backgroundColor: "#e34432",
                borderColor: "#e34432",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                borderRadius: 10,
                boxShadow: "none",
              }}
            >
              Add Todo
            </Button>
          </Col>
        </Row>
      </div>

      <div className="mb-6">
        <StatCards />
      </div>

      <TodaysTasks />
    </div>
  );
}

export default UserDashboard;
