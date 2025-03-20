(window as any).global = window;

import PageError from "./component/error/pageError";
import { WebsocketProvider } from "./component/websocket/WebsocketProvider";
import { ErrorBoundary } from "react-error-boundary";

const AppWrapper = ({ children }: any) => {
  return (
    <WebsocketProvider>
      <ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
    </WebsocketProvider>
  );
};

export default AppWrapper;
