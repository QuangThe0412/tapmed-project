import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./utils/contanst";
import NotFound from "./page/notFound/notFound";
import MainLayout from "./component/layout/layout";
import { isAdmin } from "@src/component/authentication/authUntils";
import { pathsAdmin } from "@src/utils/contanst";
import AdminLayout from "./cms/component/layout/adminLayout";

function AppRoutes() {
  return (
    <Routes>
      {paths &&
        paths.map((path) => (
          <Route
            key={path.name}
            path={path.path}
            element={
              <MainLayout>
                <path.component />
              </MainLayout>
            }
          />
        ))}
      {isAdmin() &&
        pathsAdmin &&
        pathsAdmin.map((path) => (
          <Route
            key={path.name}
            path={path.path}
            element={
              <AdminLayout>
                <path.component />
              </AdminLayout>
            }
          />
        ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
