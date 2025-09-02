import { useEffect, useState } from "react";
import API from "../../Utility/API.js";
import "../../Css/CareerManagement.css"; // your css file

export default function CareerManagement() {
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    experience: "",
    requirements: "",
    salaryRange: "",
    deadline: "",
    status: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch careers
  useEffect(() => {
    API.get("/api/careers").then((res) => setCareers(res.data));
  }, []);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirements: form.requirements
        ? form.requirements.split(",").map((r) => r.trim())
        : [],
    };

    if (editingId) {
      await API.put(`/api/careers/${editingId}`, payload);
    } else {
      await API.post("/api/careers", payload);
    }

    setForm({
      title: "",
      description: "",
      location: "",
      type: "Full-time",
      experience: "",
      requirements: "",
      salaryRange: "",
      deadline: "",
      status: true,
    });
    setEditingId(null);
    setShowForm(false);

    const res = await API.get("/api/careers");
    setCareers(res.data);
  };

  // Delete career
  const handleDelete = async (id) => {
    await API.delete(`/api/careers/${id}`);
    setCareers(careers.filter((c) => c._id !== id));
  };

  return (
    <div className="career-container">
      <h2 className="career-heading">Career Management</h2>
      <button
        className="create-btn"
        onClick={() => {
          setForm({
            title: "",
            description: "",
            location: "",
            type: "Full-time",
            experience: "",
            requirements: "",
            salaryRange: "",
            deadline: "",
            status: true,
          });
          setEditingId(null);
          setShowForm(true);
        }}
      >
        + Create Career Page
      </button>

      {showForm && (
        <form className="career-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>

          <input
            className="form-input"
            type="text"
            name="experience"
            placeholder="Experience (e.g. 2–4 years)"
            value={form.experience}
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="text"
            name="requirements"
            placeholder="Requirements (comma separated)"
            value={form.requirements}
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="text"
            name="salaryRange"
            placeholder="Salary Range (e.g. ₹6 – ₹10 LPA)"
            value={form.salaryRange}
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />

          <textarea
            className="form-textarea"
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
            Active
          </label>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <h3 className="career-list-heading">Career List</h3>
      {careers.length === 0 ? (
        <p className="no-jobs">No jobs available.</p>
      ) : (
        <ul className="career-list">
          {careers.map((c) => (
            <li key={c._id} className="career-item">
              <div className="career-info">
                <b>{c.title}</b> - {c.location} ({c.type}) <br />
                <small>
                  {c.experience} | {c.salaryRange} | Deadline:{" "}
                  {c.deadline?.substring(0, 10)} |{" "}
                  {c.status ? "Active" : "Inactive"}
                </small>
              </div>
              <div className="career-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setForm({
                      ...c,
                      requirements: Array.isArray(c.requirements)
                        ? c.requirements.join(", ")
                        : c.requirements,
                    });
                    setEditingId(c._id);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
