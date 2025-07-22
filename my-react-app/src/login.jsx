import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userslice';
import { startLoading, stopLoading } from './redux/loadingSlice';
import GrowExample from './GrowExample';

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
    confirm: false
  });

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleRoleSelect = useCallback((role) => {
    setForm((prev) => ({ ...prev, role }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(startLoading());

      const { email, password, role, confirm } = form;

      if (!email.includes('@') || password.length < 6 || !role || !confirm) {
        toast('Please fill all fields correctly.');
        dispatch(stopLoading());
        return;
      }

      setTimeout(async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/kishor/login`, {
            email,
            password,
            role
          });

          if (response.data?.success && response.data?.token) {
            document.cookie = `token=${response.data.token}; path=/; max-age=3600`;
            dispatch(setUser(response.data.user));
            toast.success('Welcome!', { position: 'top-center', autoClose: 3000 });

            const userRole = response.data.user?.role;
            const userEmail = response.data.user?.email;

            console.log('Logged in user:', response.data.user);

            if (userRole === 'recruiter') {
              navigate('/recruit');
            } else if (userRole === 'student') {
              navigate('/welcome');
            } else if (userRole === 'admin' && userEmail === 'nikhil01@gmail.com') {
              navigate('/admin');
            } else {
              toast('Unknown role or unauthorized admin. Cannot redirect.');
            }
          } else {
            toast('Login failed.');
          }
        } catch (error) {
          toast('Error: ' + error.message);
        } finally {
          dispatch(stopLoading());
        }
      }, 2000);
    },
    [form, dispatch, navigate]
  );

  const roleOptions = useMemo(() => ['student', 'recruiter', 'admin'], []);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center fw-bold mb-4 gradient-text">Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
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
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control rounded-3"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <div className="d-flex justify-content-between gap-3">
              {roleOptions.map((role) => (
                <div
                  key={role}
                  className={`role-card ${form.role === role ? 'selected' : ''}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role === 'student' && ' Student'}
                  {role === 'recruiter' && ' Recruiter'}
                  {role === 'admin' && ' Admin'}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="form-check d-flex align-items-center">
              <input
                type="checkbox"
                name="confirm"
                className="form-check-input custom-checkbox me-2"
                checked={form.confirm}
                onChange={handleChange}
                id="confirmCheck"
                required
              />
              <label className="form-check-label" htmlFor="confirmCheck">
                Confirm Login
              </label>
            </div>
          </div>

          {isLoading ? (
            <GrowExample />
          ) : (
            <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-bold">
              Login
            </button>
          )}
        </form>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          padding: 20px;
        }

        .login-card {
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

        .role-card {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          background: #f8f9fa;
          text-align: center;
          cursor: pointer;
          font-weight: 600;
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          background: #e9ecef;
        }

        .role-card.selected {
          border-color: #007bff;
          background: #e0f0ff;
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
};

export default React.memo(Login);