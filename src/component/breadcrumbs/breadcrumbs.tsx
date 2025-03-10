import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./breadcrumbs.css";
import { paths } from "../../utils/contanst";

const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  if (window.location.pathname === "/") {
    return null;
  }

  return (
    <div className="bread-crumb">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbs.map(({ match, breadcrumb }, index) => (
              <li key={match.pathname} className="breadcrumb-item">
                {paths.map((path) => {
                  if (path.path === match.pathname) {
                    const isActive =
                      match.pathname === window.location.pathname;
                    return (
                      <React.Fragment key={path.path}>
                        {isActive ? (
                          <span className="breadcrumb-link-active">
                            {path.breadcrums}
                          </span>
                        ) : (
                          <Link to={path.path} className="breadcrumb-link">
                            {path.breadcrums}
                          </Link>
                        )}
                        {index < breadcrumbs.length - 1 && (
                          <span className="breadcrumb-separator"> / </span>
                        )}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
