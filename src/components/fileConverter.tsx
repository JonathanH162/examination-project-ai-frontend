import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import "../styles/chat.css";

const FileConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
    setResponseMessage("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file === null || !file) {
      setResponseMessage("No file selected");
    } else {
      const formData = new FormData();
      formData.append("pdfFile", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/content/add-files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setResponseMessage(response.data);
      } catch (error) {
        console.error("Error converting file:", error);
      }
    }
  };

  return (
    <>
      {visible ? (
        <div className="navbar">
          <div className="FileConverter">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <button className="add-file-button" type="submit">
                  Add File
                </button>
              </div>
              <p className="return-click" onClick={handleVisible}>
                ❌
              </p>
            </form>
          </div>
          {responseMessage && (
            <div className="response-message-container">
              <p
                className={
                  responseMessage.includes("Successfully")
                    ? "response-message"
                    : "response-message-error"
                }
              >
                {responseMessage}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-invisible">
          <div className="FileConverter">
            <div>
              <button
                className="view-addFile-button"
                type="button"
                onClick={handleVisible}
              >
                Add New Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileConverter;
