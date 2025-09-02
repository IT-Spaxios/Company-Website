import Career from "../models/Career.js";

// Create job posting
export const createCareer = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      type,
      experience,
      requirements,
      salaryRange,
      deadline,
      status
    } = req.body;

    const career = new Career({
      title,
      description,
      location,
      type,
      experience,
      requirements: Array.isArray(requirements) ? requirements : requirements?.split(",").map(r => r.trim()),
      salaryRange,
      deadline,
      status
    });

    await career.save();
    res.status(201).json(career);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all jobs
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update job posting
export const updateCareer = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      type,
      experience,
      requirements,
      salaryRange,
      deadline,
      status
    } = req.body;

    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        location,
        type,
        experience,
        requirements: Array.isArray(requirements) ? requirements : requirements?.split(",").map(r => r.trim()),
        salaryRange,
        deadline,
        status
      },
      { new: true, runValidators: true }
    );

    if (!updatedCareer) return res.status(404).json({ error: "Career not found" });

    res.json(updatedCareer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete job posting
export const deleteCareer = async (req, res) => {
  try {
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);
    if (!deletedCareer) return res.status(404).json({ error: "Career not found" });

    res.json({ message: "Career deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
