import { App } from "antd";

function useAntdMessage() {
  const { message } = App.useApp();
  return { messageApi: message, contextHolder: null };
}

export default useAntdMessage;
