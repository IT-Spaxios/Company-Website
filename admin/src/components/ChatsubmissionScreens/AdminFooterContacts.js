import React, { useEffect, useState } from "react";
import API from "../../Utility/API.js";

const AdminFooterContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await API.get("/api/contact");
        setContacts(res.data.data);
        setFiltered(res.data.data);
      } catch (err) {
        console.error("Error fetching footer contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Search filter
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(contacts);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        contacts.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q)
        )
      );
    }
    setCurrentPage(1); // reset to first page when search changes
  }, [search, contacts]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📩 Footer Contact Submissions</h2>

      {/* Search Input */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>⏳ Loading...</p>
      ) : currentData.length === 0 ? (
        <p>No footer contacts found.</p>
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
                  Phone
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
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    {c.name}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    {c.email}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    {c.phone || "N/A"}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    {c.message}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
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
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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

export default AdminFooterContacts;
