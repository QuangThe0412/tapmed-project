import { useNavigate, Link } from "react-router-dom";
import "./pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  onPageChange,
}) => {
  const navigate = useNavigate();

  // Handle page change
  const handlePageClick = (page: number) => {
    if (page === currentPage) return;

    if (onPageChange) {
      onPageChange(page);
    }

    // Navigate to the new page
    navigate(`${baseUrl}?page=${page}`);
  };

  // Generate page numbers
  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {currentPage === i ? (
            <span className="page-link">{i}</span>
          ) : (
            <Link
              className="page-link"
              to={`${baseUrl}?page=${i}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(i);
              }}
            >
              {i}
            </Link>
          )}
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="pagenav">
      <nav className="clearfix relative nav_pagi w-full">
        <ul className="pagination" role="navigation">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            {currentPage === 1 ? (
              <span className="page-link" aria-hidden="true">
                ‹
              </span>
            ) : (
              <Link
                className="page-link"
                to={`${baseUrl}?page=${currentPage - 1}`}
                rel="prev"
                aria-label="« Previous"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage - 1);
                }}
              >
                ‹
              </Link>
            )}
          </li>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            {currentPage === totalPages ? (
              <span className="page-link" aria-hidden="true">
                ›
              </span>
            ) : (
              <Link
                className="page-link"
                to={`${baseUrl}?page=${currentPage + 1}`}
                rel="next"
                aria-label="Next »"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage + 1);
                }}
              >
                ›
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
