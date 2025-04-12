import { Link } from "react-router-dom";
import "./header.css";
import { paths } from "../../../src/utils/contanst";
import { checkActivePath } from "@src/utils/common";

const HeaderMenu: React.FC = () => {
  return (
    <nav className="flex justify-center header-menu shadow-md hidden lg:flex">
      <div className="container">
        <ul className="flex w-full">
          {paths &&
            paths.map(
              (path, index) =>
                path.isShowMenu && (
                  <li key={index} className="flex-1 text-center">
                    <Link
                      to={path.path}
                      className={`header-menu-item whitespace-nowrap ${
                        checkActivePath(path.path) ? "active" : ""
                      }`}
                    >
                      {path.breadcrums}
                    </Link>
                  </li>
                )
            )}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderMenu;
