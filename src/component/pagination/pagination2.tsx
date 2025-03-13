import ReactPaginate from "react-paginate";
import "./pagination2.css";

interface Pagination2Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination2: React.FC<Pagination2Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;

  return (
    <div className="pagination-container mt-6 flex justify-center">
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={"pagination flex"}
        activeClassName={"active bg-blue-500 text-white"}
        pageClassName={"page-item mx-1"}
        pageLinkClassName={"page-link border py-2 px-4 rounded"}
        previousClassName={"page-item mx-1"}
        previousLinkClassName={"page-link border py-2 px-4 rounded"}
        nextClassName={"page-item mx-1"}
        nextLinkClassName={"page-link border py-2 px-4 rounded"}
        disabledClassName={"disabled opacity-50"}
        breakClassName={"page-item mx-1"}
        breakLinkClassName={"page-link border py-2 px-4 rounded"}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination2;
