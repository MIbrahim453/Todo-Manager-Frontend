import { useEffect, useContext } from "react";
import { Col, Row, Typography } from "antd";
import AdminStatCards from "./StatCards";
import RecentUsersTable from "./RecentUsersTable";
import { AuthContext } from "../../../context/authContext";
import { UserContext } from "../../../context/userContext";
import { TodoContext } from "../../../context/todoContext";

const { Title, Text } = Typography;

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const { getRecentUsers, getAllUsers } = useContext(UserContext);
  const { getAllTodos } = useContext(TodoContext);

  useEffect(() => {
    getRecentUsers?.();
    getAllUsers?.();
    getAllTodos?.();
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
              {getGreeting()}, {user?.name || "Admin"}
            </Title>
            <Text className="!text-sm !text-text-muted font-manrope mt-1 block">
              Here's your{" "}
              <span className="font-semibold text-primary underline underline-offset-2">
                platform overview
              </span>{" "}
              for today.
            </Text>
          </Col>
        </Row>
      </div>

      <div className="mb-6">
        <AdminStatCards />
      </div>

      <RecentUsersTable />
    </div>
  );
}

export default AdminDashboard;
