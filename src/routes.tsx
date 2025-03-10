import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./utils/contanst";

function AppRoutes() {
  return (
    <Routes>
      {paths &&
        paths.map((path) => (
          <Route
            key={path.name}
            path={path.path}
            element={<path.component />}
          />
        ))}
    </Routes>
  );
}

export default AppRoutes;
