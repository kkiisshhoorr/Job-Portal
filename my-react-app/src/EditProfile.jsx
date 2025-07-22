import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './utils/constraints';
import UploadResumeButton from './UploadResumeButton.jsx';
import { setUser } from './redux/userslice';

const EditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialForm = useMemo(() => ({
    name: user.name || '',
    email: user.email || '',
  }), [user]);

  const [form, setForm] = useState(initialForm);
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profileImage || '');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const handleResumeSelect = useCallback((file) => {
    setResumeFile(file);
  }, []);

  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();

    try {
      const updateData = { ...form };

      if (profileImageFile) {
        const imageForm = new FormData();
        imageForm.append('image', profileImageFile);
        imageForm.append('userId', user._id);

        const imageResponse = await axios.post(`${API_BASE_URL}/kishor/upload-profile`, imageForm, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        updateData.profileImage = imageResponse.data.profileImage;
      }

      if (resumeFile) {
        const resumeForm = new FormData();
        resumeForm.append('resume', resumeFile);
        resumeForm.append('userId', user._id);

        const resumeResponse = await axios.post(`${API_BASE_URL}/kishor/upload-resume`, resumeForm, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        updateData.resume = resumeResponse.data.resume;
      }

      const response = await axios.put(`${API_BASE_URL}/kishor/update-user/${user._id}`, updateData, {
        withCredentials: true
      });

      dispatch(setUser(response.data.user));
      toast.success('Profile updated!');
      navigate('/welcome');
    } catch (err) {
      toast.error('Update failed: ' + err.message);
    }
  }, [dispatch, form, navigate, profileImageFile, resumeFile, user._id]);

  return (
    <div className="container mt-5">
      <button
        className="btn"
        style={{
          background: 'linear-gradient(to right, #007bff, #00c6ff)',
          color: 'white',
          fontWeight: '600',
          borderRadius: '30px',
          padding: '8px 20px',
          border: 'none'
        }}
        onClick={() => navigate('/welcome')}
      >
        Back to Dashboard
      </button>

      <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h3 className="mb-4 text-center fw-bold text-primary">Edit Your Profile</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control rounded-3"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Replace Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control rounded-3"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div className="mt-3 text-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-thumbnail rounded-circle"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Replace Resume</label>
            <UploadResumeButton onResumeSelected={handleResumeSelect} />
            {resumeFile && (
              <div className="mt-2 text-muted small">
                Selected: {resumeFile.name}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-bold">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditProfile);
