import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import { paths } from "../../../src/utils/contanst";

const HeaderMenu: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-center header-menu shadow-md hidden lg:flex">
      <div className="container">
        <ul className="flex justify-evenly">
          {paths &&
            paths.map(
              (path, index) =>
                path.isShowMenu && (
                  <li key={index}>
                    <Link
                      to={path.path}
                      className={`header-menu-item ${
                        location.pathname === path.path ? "active" : ""
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
