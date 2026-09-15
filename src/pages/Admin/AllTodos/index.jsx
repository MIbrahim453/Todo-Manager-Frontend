import { useEffect, useContext } from "react";
import { Col, Row, Typography } from "antd";
import TodoStatCards from "./StatCards";
import TodosTable from "./TodosTable";
import { TodoContext } from "../../../context/todoContext";

const { Title, Text } = Typography;

function AllTodos() {
  const { getAllTodos } = useContext(TodoContext);

  useEffect(() => {
    getAllTodos?.();
  }, []);

  return (
    <div className="font-manrope">

      <div className="mb-6">
        <Text className="!text-xs !font-bold !uppercase !tracking-[0.14em] !text-text-muted font-manrope">
          ADMIN · TODO MANAGEMENT
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
              All Todos
            </Title>
            <Text className="!text-sm !text-text-muted font-manrope mt-1 block">
              Browse and filter{" "}
              <span className="font-semibold text-primary underline underline-offset-2">
                every todo
              </span>{" "}
              across the platform.
            </Text>
          </Col>
        </Row>
      </div>

      <div className="mb-6">
        <TodoStatCards />
      </div>

      <TodosTable />
    </div>
  );
}

export default AllTodos;
