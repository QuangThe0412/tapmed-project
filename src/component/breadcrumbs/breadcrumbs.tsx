import React from "react";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./breadcrumbs.css";
import { paths } from "../../utils/contanst";
import { getIdFromSlug } from "../../utils/common";
import { useProductStore } from "@src/stores/productStore";

const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const { products } = useProductStore();
  const productId = getIdFromSlug(location.pathname);
  const product = products.find((p) => p.id === productId);

  const generateBreadcrumbName = (match: any) => {
    if (match.pathname.includes("/products/") && product) {
      return product.name;
    }

    if (match.pathname.includes("/news/")) {
      return "Blogs";
    }

    const path = paths.find((p) => p.path === match.pathname);
    return path ? path.breadcrums : match.breadcrumb;
  };

  return (
    <div className="bread-crumb">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadcrumbs.map(({ match, breadcrumb }, index) => (
              <li key={match.pathname} className="breadcrumb-item">
                {index < breadcrumbs.length - 1 ? (
                  <Link to={match.pathname} className="breadcrumb-link">
                    {generateBreadcrumbName(match)}
                  </Link>
                ) : (
                  <span className="breadcrumb-link-active">
                    {generateBreadcrumbName(match)}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator"> / </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
