import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name should be at least 3 characters long']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    role: {
      type: String,
      enum: ['student', 'admin','recruiter'],
      default: 'student',
      required: [true, 'Role is required']
    },
    profileImage: {
      type: String,
      required: false
    },
    resume: {
      type: String,
      required: false
    }

  },
  {
    timestamps: true 
  }
);

const User = mongoose.model('students', userSchema);
export default User;