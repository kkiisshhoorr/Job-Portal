import users from '../data/users.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudnary from '../utils/cloudinary.js';
import fs from 'fs';

// Existing functions (unchanged)
export const getUsers = (req, res) => {
  res.json(users);
};

export const registerUser = async (req, res) => {
  const { name, password, phone, email, role } = req.body;
  const imageFile = req.file;

  if (!name || !password || !phone || !email || !role) {
    return res.status(400).json({ message: 'All fields needed' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl = null;
    if (imageFile) {
      try {
        const uploadResult = await cloudnary.uploader.upload(imageFile.path, {
          folder: 'user-profiles'
        });
        profileImageUrl = uploadResult.secure_url;
        console.log('Uploaded to Cloudinary:', profileImageUrl);

        fs.unlink(imageFile.path, (err) => {
          if (err) {
            console.error('Failed to delete local image:', err.message);
          } else {
            console.log('Local image deleted:', imageFile.path);
          }
        });
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr.message);
      }
    }

    const newUser = new User({
      name,
      password: hashedPassword,
      phone,
      email,
      role,
      profileImage: profileImageUrl
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, userEmail: savedUser.email },
      process.env.secret_key,
      { expiresIn: '1h' }
    );

    const { password: _, __v, ...userDetails } = savedUser.toObject();

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: userDetails,
      token
    });

  } catch (err) {
    console.error('Signup failed:', err.message);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Email, password, and role are required',
      success: false
    });
  }

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: 'User not found', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password', success: false });
    }

    const token = jwt.sign(
      { userId: user._id, userEmail: user.email },
      process.env.secret_key,
      { expiresIn: '1h' }
    );

    const { password: _, __v, ...userDetails } = user.toObject();

    res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
      })
      .status(200)
      .json({
        message: 'Login successful',
        success: true,
        user: userDetails,
        token
      });

    console.log('API Response:', {
      message: 'Login successful',
      success: true,
      user: userDetails,
      token
    });
    console.log('Token:', token);
    console.log('Success:', true);

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

export const uploadResume = async (req, res) => {
  const userId = req.body.userId;
  const resumeFile = req.file;

  if (!userId || !resumeFile) {
    return res.status(400).json({ message: 'User ID and resume file are required' });
  }

  try {
    const uploadResult = await cloudnary.uploader.upload(resumeFile.path, {
      folder: 'user-resumes',
      resource_type: 'raw'
    });

    const resumeUrl = uploadResult.secure_url;

    await User.findByIdAndUpdate(userId, { resume: resumeUrl });

    fs.unlink(resumeFile.path, (err) => {
      if (err) console.error('Failed to delete local resume:', err.message);
      else console.log('Local resume deleted:', resumeFile.path);
    });

    res.status(200).json({ message: 'Resume uploaded successfully', resume: resumeUrl });
  } catch (err) {
    console.error('Resume upload failed:', err.message);
    res.status(500).json({ message: 'Resume upload failed', error: err.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  const userId = req.body.userId;
  const imageFile = req.file;

  if (!userId || !imageFile) {
    return res.status(400).json({ message: 'User ID and image file are required' });
  }

  try {
    const uploadResult = await cloudnary.uploader.upload(imageFile.path, {
      folder: 'profile-images',
      resource_type: 'auto'
    });

    const profileImageUrl = uploadResult.secure_url;

    await User.findByIdAndUpdate(userId, { profileImage: profileImageUrl });

    fs.unlink(imageFile.path, () => {});
    res.status(200).json({ profileImage: profileImageUrl });
  } catch (err) {
    res.status(500).json({ message: 'Profile image upload failed', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    const { password, __v, ...userDetails } = updatedUser.toObject();
    res.status(200).json({ success: true, user: userDetails });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// ✅ NEW: Admin fetch all student/recruiter users
export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['student', 'recruiter'] } }).select('-password');
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('Admin fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// ✅ NEW: Admin update any user
export const adminUpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Admin update error:', err.message);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
export const adminDeleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    console.log('Admin deleted user:', deletedUser.email);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Admin delete error:', err.message);
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};