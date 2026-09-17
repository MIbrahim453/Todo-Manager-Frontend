import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-5 font-manrope">
      <Result
        status="404"
        title="Page not found"
        subTitle="The page you are looking for does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back to home
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
