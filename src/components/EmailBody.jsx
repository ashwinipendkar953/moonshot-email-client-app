import { useDispatch, useSelector } from "react-redux";
import DateComponent from "./DateComponent";
import { fetchEmailBody, setFavorites } from "../features/email/emailSlice";
import { useEffect } from "react";
import DOMPurify from "dompurify";

const EmailBody = ({ email }) => {
  const dispatch = useDispatch();
  const { emailBody } = useSelector((state) => state.email);
  const sanitizedHTML = DOMPurify.sanitize(emailBody);

  useEffect(() => {
    dispatch(fetchEmailBody(email?.id));
  }, [dispatch, email]);

  const handleClick = (email) => {
    dispatch(setFavorites(email));
  };

  return (
    <div className="card email-body-card">
      <div className="email-body-row">
        <div className="left-side">
          <div className="avatar">
            <div className="avatar-text">{email?.from?.name.charAt(0)}</div>
          </div>
        </div>
        <div className="right-side">
          <div className="d-flex justify-content-between align-items-center">
            <p className="subject">{email?.subject}</p>
            <button
              className="btn mark-fav-btn"
              onClick={() => handleClick(email)}
            >
              Mark as favorite
            </button>
          </div>
          <DateComponent timestamp={email?.date} />
          <div
            className="body-text"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailBody;
