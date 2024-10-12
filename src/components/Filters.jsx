import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter } from "../features/email/emailSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { activeFilter } = useSelector((state) => state.email);

  const handleFilterClick = (filter) => {
    dispatch(setActiveFilter(filter));
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div className="me-3 fw-semibold">Filter By:</div>
      <button
        className={`btn fw-semibold filter-btn ${
          activeFilter === "unread" ? "active" : ""
        }`}
        onClick={() => handleFilterClick("unread")}
      >
        Unread
      </button>
      <button
        className={`btn fw-semibold filter-btn ${
          activeFilter === "read" ? "active" : ""
        }`}
        onClick={() => handleFilterClick("read")}
      >
        Read
      </button>
      <button
        className={`btn fw-semibold filter-btn ${
          activeFilter === "favorites" ? "active" : ""
        }`}
        onClick={() => handleFilterClick("favorites")}
      >
        Favorites
      </button>
    </div>
  );
};

export default Filters;
