import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], required: true }
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
