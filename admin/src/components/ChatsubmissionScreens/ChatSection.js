import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AdminMainContacts from "./AdminMainContacts";
import AdminFooterContacts from "./AdminFooterContacts";
import AdminChatBotSubmissions from "./AdminChatBotSubmissions";
import "../../Css/ChatSection.css";

const ChatSection = () => {
  const [view, setView] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="chat-section">
      {/* Header with back to home */}
      <div className="chat-header">
        <h2 className="chat-title">💬 Chat Section</h2>
        <button className="home-btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>

      {/* Menu buttons (only visible when no view is selected) */}
      {!view && (
        <div className="menu-buttons">
          <button className="menu-btn" onClick={() => setView("chatbot")}>
            🤖 Chatbot Submissions
          </button>
          <button className="menu-btn" onClick={() => setView("main")}>
            📋 Main Contact Submissions
          </button>
          <button className="menu-btn" onClick={() => setView("footer")}>
            📩 Footer Contact Submissions
          </button>
        </div>
      )}

      {/* Render selected table */}
      <div className="table-container">
        {view === "chatbot" && (
          <>
            <AdminChatBotSubmissions />
            <div className="back-btn-container">
              <button className="back-btn" onClick={() => setView(null)}>
                ⬅ Back to Options
              </button>
            </div>
          </>
        )}
        {view === "main" && (
          <>
            <AdminMainContacts />
            <div className="back-btn-container">
              <button className="back-btn" onClick={() => setView(null)}>
                ⬅ Back to Options
              </button>
            </div>
          </>
        )}
        {view === "footer" && (
          <>
            <AdminFooterContacts />
            <div className="back-btn-container">
              <button className="back-btn" onClick={() => setView(null)}>
                ⬅ Back to Options
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSection;

