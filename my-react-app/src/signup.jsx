import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { toast } from 'react-toastify';
import InputFileUpload from './uploadbutton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from './redux/loadingSlice';
import GrowExample from './GrowExample';

function Signup() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  const [form, setForm] = useState({
    name: '',
    password: '',
    phone: '',
    email: '',
    role: '',
    agree: false
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();


  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    dispatch(startLoading());

    if (
      !form.name ||
      form.password.length < 6 ||
      !form.phone ||
      !form.email.includes('@') ||
      !form.role ||
      !form.agree
    ) {
      toast('Please fill all fields correctly');
      dispatch(stopLoading());
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', image);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/kishor/register`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.user) {
          toast.success('Signup successful!', {
            position: 'top-center',
            autoClose: 3000
          });
          navigate('/login');
        } else {
          toast('Signup failed.');
        }
      } catch (error) {
        toast('Error: ' + error.message);
      } finally {
        dispatch(stopLoading());
      }
    }, 2000);
  }, [dispatch, form, image, navigate]);

  const memoizedSetImage = useCallback((file) => {
    setImage(file);
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="text-center fw-bold mb-4 gradient-text">Create Your Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control rounded-3"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="form-control rounded-3"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="form-control rounded-3"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control rounded-3"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              name="role"
              className="form-select rounded-3"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="student"> Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin"> Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Upload Profile Image</label>
            <InputFileUpload onFilesSelected={memoizedSetImage} />
          </div>

          <div className="mb-4">
            <div className="form-check d-flex align-items-center">
              <input
                type="checkbox"
                name="agree"
                className="form-check-input custom-checkbox me-2"
                checked={form.agree}
                onChange={handleChange}
                id="agreeCheck"
                required
              />
              <label className="form-check-label" htmlFor="agreeCheck">
                I agree to all T&C
              </label>
            </div>
          </div>

          {isLoading ? (
            <GrowExample />
          ) : (
            <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-bold">
              Sign Up
            </button>
          )}
        </form>
      </div>

      <style>{`
        .signup-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }

        .signup-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .gradient-text {
          background: linear-gradient(to right, #007bff, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-control,
        .form-select {
          font-size: 16px;
          padding: 12px;
        }

        .btn-primary {
          background: linear-gradient(to right, #007bff, #00c6ff);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(to right, #0056b3, #0096c7);
        }

        .form-check-label {
          font-weight: 500;
          color: #333;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          border: 2px solid #333;
          background-color: #fff;
          cursor: pointer;
        }

        .custom-checkbox:checked {
          background-color: #007bff;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
}

export default React.memo(Signup);
