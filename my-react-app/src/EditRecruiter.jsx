import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './utils/constraints';
import { setUser } from './redux/userslice';

const EditRecruiter = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialForm = useMemo(() => ({
    name: user.name || '',
    email: user.email || ''
  }), [user]);

  const [form, setForm] = useState(initialForm);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user.profileImage || '');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const handleUpdate = useCallback(async (e) => {
    e.preventDefault();

    try {
      const updateData = { ...form };

      if (profileImageFile) {
        const imageForm = new FormData();
        imageForm.append('image', profileImageFile);
        imageForm.append('userId', user._id);

        const imageResponse = await axios.post(
          `${API_BASE_URL}/kishor/upload-profile`,
          imageForm,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );

        updateData.profileImage = imageResponse.data.profileImage;
      }

      const response = await axios.put(
        `${API_BASE_URL}/kishor/update-user/${user._id}`,
        updateData,
        { withCredentials: true }
      );

      dispatch(setUser(response.data.user));
      toast.success('Profile updated!');
      navigate('/recruit');
    } catch (err) {
      toast.error('Update failed: ' + err.message);
    }
  }, [dispatch, form, navigate, profileImageFile, user._id]);

  return (
    <div className="container mt-5">
      <button
        className="btn"
        style={{
          background: 'linear-gradient(to right, #ff5900ff, #ff1100ff)',
          color: 'white',
          fontWeight: '600',
          borderRadius: '30px',
          padding: '8px 20px',
          border: 'none',
          marginBottom: '20px'
        }}
        onClick={() => navigate('/recruit')}
      >
        Back to Dashboard
      </button>

      <div
        className="card shadow-lg border-0 rounded-5 p-5 mx-auto"
        style={{ maxWidth: '600px', background: '#ffffff' }}
      >
        <h3 className="text-center fw-bold text-gradient mb-4">Edit Recruiter Profile</h3>

        <form onSubmit={handleUpdate}>
          <div className="mb-4 text-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-circle"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  border: '4px solid #00c6ff',
                  boxShadow: '0 0 10px rgba(0,198,255,0.5)'
                }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
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
            <label className="form-label fw-semibold">Email Address</label>
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
            <label className="form-label fw-semibold">Replace Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control rounded-3"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100 py-2 rounded-pill fw-bold"
          >
            Save Changes
          </button>
        </form>

        <style>{`
          .text-gradient {
            background: linear-gradient(to right, #007bff, #00c6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .btn-gradient {
            background: linear-gradient(to right, #007bff, #00c6ff);
            color: white;
            border: none;
            transition: transform 0.2s ease;
          }

          .btn-gradient:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default React.memo(EditRecruiter);
