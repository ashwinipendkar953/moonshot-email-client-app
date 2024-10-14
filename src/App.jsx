import EmailList from "./components/EmailList";
import Filters from "./components/Filters";
import EmailBody from "./components/EmailBody";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EmailBodyModal from "./components/EmailBodyModel";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  const { selectedEmail } = useSelector((state) => state.email);
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);

  useEffect(() => {
    if (isMediumOrSmaller && selectedEmail) {
      const modalElement = document.getElementById("emailBodyModal");
      const modal = new Modal(modalElement);
      modal.show();
    }
  }, [isMediumOrSmaller, selectedEmail]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumOrSmaller(window.innerWidth <= 992);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="py-4 px-5">
      <Filters />
      <div
        className={`my-4 ${
          selectedEmail && !isMediumOrSmaller
            ? "d-flex gap-4 align-items-start"
            : ""
        }`}
      >
        <EmailList />
        {selectedEmail && !isMediumOrSmaller && (
          <EmailBody email={selectedEmail} />
        )}
      </div>

      {/* Show modal on medium and smaller screens */}
      {isMediumOrSmaller && selectedEmail && (
        <EmailBodyModal email={selectedEmail} />
      )}
    </div>
  );
};

export default App;
