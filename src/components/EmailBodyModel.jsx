import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmailBody,
  removeFromFavorites,
  setFavorites,
} from "../features/email/emailSlice";
import DOMPurify from "dompurify";
import { useEffect } from "react";
import DateComponent from "./DateComponent";

const EmailBodyModal = ({ email }) => {
  const dispatch = useDispatch();
  const { emailBody, favorites } = useSelector((state) => state.email);
  const sanitizedHTML = DOMPurify.sanitize(emailBody);

  useEffect(() => {
    if (email) {
      dispatch(fetchEmailBody(email.id));
    }
  }, [dispatch, email]);

  const isFavorite = favorites.some((fav) => fav.id === email.id);

  const handleFavorite = (email) => {
    dispatch(setFavorites(email));
  };

  const handleUnfavorite = (email) => {
    dispatch(removeFromFavorites(email));
  };

  return (
    <div
      className="modal fade"
      id="emailBodyModal"
      tabIndex="-1"
      aria-labelledby="emailBodyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ top: "5px", right: "5px" }}
          ></button>
          <section className="email-body-row">
            <aside className="left-side">
              <div className="avatar">
                <div className="avatar-text">{email?.from?.name.charAt(0)}</div>
              </div>
            </aside>
            <section className="right-side">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="subject">{email?.subject}</h2>
                {isFavorite ? (
                  <button
                    className="btn mark-fav-btn fw-semibold"
                    onClick={() => handleUnfavorite(email)}
                  >
                    Unfavorite
                  </button>
                ) : (
                  <button
                    className="btn mark-fav-btn fw-semibold"
                    onClick={() => handleFavorite(email)}
                  >
                    Mark as favorite
                  </button>
                )}
              </div>
              <DateComponent timestamp={email?.date} />
              <div
                className="body-text"
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              />
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmailBodyModal;
