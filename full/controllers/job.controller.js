import Job from '../models/job.model.js';

export const postJob = async (req, res) => {
  const { recruiterId, title, description, location, type } = req.body;

  if (!recruiterId || !title || !description || !location || !type) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newJob = new Job({ recruiterId, title, description, location, type });
    const savedJob = await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: savedJob });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job', error: err.message });
  }
};

export const getJobsByRecruiter = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiterId', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};