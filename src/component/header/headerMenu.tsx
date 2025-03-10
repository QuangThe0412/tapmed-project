import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { paths } from "../../../src/utils/contanst";

const HeaderMenu: React.FC = () => {
  return (
    <nav className="flex justify-center header-menu shadow-md hidden lg:flex">
      <div className="container">
        <ul className="flex justify-evenly">
          {paths &&
            paths.map((path, index) => (
              <li key={index} className="flex-grow text-center">
                <Link to={path.path}>{path.breadcrums}</Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderMenu;
