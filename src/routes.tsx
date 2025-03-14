import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./utils/contanst";
import NotFound from "./page/notFound/notFound";
import MainLayout from "./component/layout/layout";

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
