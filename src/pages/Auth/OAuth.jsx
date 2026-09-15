import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase.js";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAntdMessage from "../../hooks/useAntdMessage.jsx";

function OAuth() {
  const { google } = useContext(AuthContext);
  const navigate = useNavigate();
  const { messageApi, contextHolder } = useAntdMessage();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const res = await google(idToken);
      if (res.success) {
        messageApi.success(res.message || "User Login successful");
      } else {
        messageApi.error(res.message || "Google Login failed");
      }
      if (res.data.user.role === "member") {
        navigate("/user/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      messageApi.error(error?.response?.data?.message || "Google Login failed");
    }
  };
  return (
    <>
      {contextHolder}
      <Button
        type="default"
        onClick={googleLogin}
        icon={<GoogleOutlined />}
        size="large"
        block
        className="border-border! bg-surface-secondary! font-semibold! text-primary! hover:bg-primary! hover:text-primary-text!"
      >
        Continue with Google
      </Button>
    </>
  );
}

export default OAuth;
