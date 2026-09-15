import { useEffect, useContext } from "react";
import { Col, Row, Typography } from "antd";
import UserStatCards from "./StatCards";
import UsersTable from "./UsersTable";
import { UserContext } from "../../../context/userContext";

const { Title, Text } = Typography;

function AllUsers() {
  const { getAllUsers } = useContext(UserContext);

  useEffect(() => {
    getAllUsers?.();
  }, []);

  return (
    <div className="font-manrope">

      <div className="mb-6">
        <Text className="!text-xs !font-bold !uppercase !tracking-[0.14em] !text-text-muted font-manrope">
          ADMIN · USER MANAGEMENT
        </Text>

        <Row
          justify="space-between"
          align="bottom"
          className="mt-1"
          gutter={[16, 12]}
        >
          <Col xs={24}>
            <Title
              level={2}
              className="!mb-0 !text-2xl sm:!text-3xl !font-extrabold !text-text-primary font-manrope"
            >
              All Users
            </Title>
            <Text className="!text-sm !text-text-muted font-manrope mt-1 block">
              Manage your platform's{" "}
              <span className="font-semibold text-primary underline underline-offset-2">
                user accounts
              </span>{" "}
              and permissions.
            </Text>
          </Col>
        </Row>
      </div>

      <div className="mb-6">
        <UserStatCards />
      </div>

      <UsersTable />
    </div>
  );
}

export default AllUsers;
