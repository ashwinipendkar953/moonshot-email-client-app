import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmails,
  setReadEmails,
  setSelectedEmail,
} from "../features/email/emailSlice";
import DateComponent from "./DateComponent";
import PaginationControls from "./PaginationControls";
import LoadingSpinner from "./LoadingSpinner";

const EmailList = () => {
  const dispatch = useDispatch();
  const {
    emails,
    status,
    error,
    readEmails,
    selectedEmail,
    favorites,
    activeFilter,
  } = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  const handleClick = (email) => {
    dispatch(setSelectedEmail(email));
    dispatch(setReadEmails(email));
  };

  const getFilteredEmails = () => {
    if (activeFilter === "favorites") {
      return emails?.filter((email) =>
        favorites.some((fav) => fav.id === email?.id)
      );
    } else if (activeFilter === "read") {
      return emails?.filter((email) =>
        readEmails.some((read) => read.id === email?.id)
      );
    } else if (activeFilter === "unread") {
      return emails?.filter(
        (email) => !readEmails.some((read) => read.id === email?.id)
      );
    }
    return emails;
  };

  const filteredEmails = getFilteredEmails();

  return (
    <div className="email-list w-md-100">
      {status === "loading" && <LoadingSpinner />}
      {status === "error" && (
        <div className="text-danger fw-semibold">{error}</div>
      )}

      {filteredEmails.map((email) => {
        const isFavorite = favorites.some((fav) => fav.id === email.id);
        const isRead = readEmails.some((el) => el.id === email.id);
        return (
          <div
            key={email?.id}
            className={`card mb-4 email-item  ${
              selectedEmail?.id === email?.id ? "active" : ""
            } ${isRead ? "read-emails" : ""} `}
            onClick={() => handleClick(email)}
            data-bs-toggle="modal"
            data-bs-target="#emailBodyModal"
          >
            <div className="email-row">
              <div className="avatar">
                <div className="avatar-text">{email?.from.name.charAt(0)}</div>
              </div>
              <div className="email-details">
                <p className="mb-0">
                  <span className="me-1">From:</span>{" "}
                  <span className="from-text">{email?.from.name}</span>{" "}
                  <span className="from-text">
                    &lt;
                    {email?.from.email}&gt;
                  </span>
                </p>
                <p className="mb-0">
                  <span className="me-1">Subject:</span>{" "}
                  <span className="subject">{email?.subject}</span>
                </p>
                <p
                  className={`short-description mb-0 ${
                    selectedEmail ? "text-truncate truncate" : ""
                  }`}
                >
                  {email?.short_description}
                </p>
                <div className="d-flex align-items-center">
                  <DateComponent timestamp={email?.date} />
                  {isFavorite && (
                    <p className="mb-0 ms-4 favorite fw-semibold">Favorite</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <PaginationControls />
    </div>
  );
};

export default EmailList;
