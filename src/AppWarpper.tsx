(window as any).global = window;

import { useEffect } from "react";
import PageError from "./component/error/pageError";
import { WebsocketProvider } from "./component/websocket/WebsocketProvider";
import { ErrorBoundary } from "react-error-boundary";
import useOrderStore, { initOrderType } from "./stores/useOrderStore";
import useAuthStore from "./component/authentication/useAuthStore";
import {
  authEvent,
  removeLogoutEvent,
} from "./component/authentication/authEvent";
import { logoutEndpoint } from "./component/authentication/authEndpoint";
import { clearStorage } from "./component/authentication/authUntils";

const AppWrapper = ({ children }: any) => {
  const { setOrders } = useOrderStore();
  const { setUser } = useAuthStore();

  useEffect(() => {
    authEvent.on("LOGOUT", () => {
      logoutEndpoint();
      clearStorage();
      setOrders(initOrderType);
      setUser(null);
    });

    return () => {
      removeLogoutEvent();
    };
  }, []);
  return (
    <WebsocketProvider>
      <ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
    </WebsocketProvider>
  );
};

export default AppWrapper;
