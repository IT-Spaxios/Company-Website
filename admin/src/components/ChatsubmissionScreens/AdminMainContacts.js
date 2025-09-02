import React, { useEffect, useState } from "react";
import API from "../../Utility/API.js";

const AdminMainContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get("/api/main");
        setContacts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Filter contacts by name/email
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Reset to first page if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredContacts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Main Contact Submissions</h2>

      {/* Search box */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {loading ? (
        <p>⏳ Loading...</p>
      ) : currentData.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Name
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Email
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Mobile
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Purpose
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Source
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Message
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((c, i) => (
                <tr
                  key={c._id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.name}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.email}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.mobile}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.purpose?.join(", ")}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.source?.join(", ")}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {c.message}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === 1 ? "#eee" : "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ⬅ Prev
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === totalPages ? "#eee" : "#fff",
                cursor:
                  currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMainContacts;
