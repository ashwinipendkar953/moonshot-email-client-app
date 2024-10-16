import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../features/email/emailSlice";
import { useEffect } from "react";

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchEmails(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchEmails(currentPage - 1));
    }
  };

  return (
    <div className="pagination-controls">
      <button
        className="btn"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
