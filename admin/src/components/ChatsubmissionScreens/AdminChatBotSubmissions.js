// src/components/ChatsubmissionScreens/AdminChatSubmissions.js
import React, { useEffect, useState } from "react";
import "../../Css/AdminChatSubmissions.css";
import API from "../../Utility/API.js";

const AdminChatBotSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get("/api/chat");
        setSubmissions(res.data.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filtered = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="admin-container">
      <h2>📩 ChatBot Submission Forms</h2>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : currentData.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Sub</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((s) => (
                <tr key={s._id}>
                  <td>{s.serviceCategory}</td>
                  <td>{s.subCategory || "-"}</td>
                  <td>{s.name}</td>
                  <td>{s.contact}</td>
                  <td>{s.email}</td>
                  <td>{s.message || "-"}</td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Styled Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminChatBotSubmissions;
