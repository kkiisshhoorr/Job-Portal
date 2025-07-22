import express from 'express';
import {
  postJob,
  getJobsByRecruiter,
  updateJob,
  deleteJob,
  getAllJobs
} from '../controllers/job.controller.js';

const router = express.Router();

router.post('/jobs/post', postJob);
router.get('/jobs/recruiter/:recruiterId', getJobsByRecruiter);
router.get('/jobs', getAllJobs); 
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;