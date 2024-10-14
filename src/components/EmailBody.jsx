import { useDispatch, useSelector } from "react-redux";
import DateComponent from "./DateComponent";
import {
  fetchEmailBody,
  removeFromFavorites,
  setFavorites,
} from "../features/email/emailSlice";
import { useEffect } from "react";
import DOMPurify from "dompurify";

const EmailBody = ({ email }) => {
  const dispatch = useDispatch();
  const { emailBody, favorites } = useSelector((state) => state.email);
  const sanitizedHTML = DOMPurify.sanitize(emailBody);

  const isFavorite = favorites.some((fav) => fav.id === email.id);

  useEffect(() => {
    dispatch(fetchEmailBody(email?.id));
  }, [dispatch, email]);

  const handleFavorite = (email) => {
    dispatch(setFavorites(email));
  };

  const handleUnfavorite = (email) => {
    dispatch(removeFromFavorites(email));
  };

  return (
    <article className="card email-body-card">
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
    </article>
  );
};

export default EmailBody;
