import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/kishor/admin/users`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setUsers(res.data.users);
        } else {
          toast.error('Failed to fetch users');
        }
      })
      .catch(err => {
        toast.error('Error: ' + err.message);
      });
  }, []);

  const logoutHandler = () => {
    axios.get(`${API_BASE_URL}/kishor/logout`, { withCredentials: true })
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/');
      })
      .catch(err => {
        toast.error('Logout failed: ' + err.message);
      });
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios.put(`${API_BASE_URL}/kishor/admin/update-user/${editingUser}`, form, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          toast.success('User updated');
          setUsers(users.map(u => u._id === editingUser ? res.data.user : u));
          setEditingUser(null);
        } else {
          toast.error('Update failed');
        }
      })
      .catch(err => {
        toast.error('Error: ' + err.message);
      });
  };

  const handleDelete = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    axios.delete(`${API_BASE_URL}/kishor/admin/delete-user/${userId}`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          toast.success('User deleted');
          setUsers(users.filter(u => u._id !== userId));
        } else {
          toast.error('Delete failed');
        }
      })
      .catch(err => {
        toast.error('Error: ' + err.message);
      });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const students = filteredUsers.filter(u => u.role === 'student');
  const recruiters = filteredUsers.filter(u => u.role === 'recruiter');

  return (
    <div className="admin-container">
      <div className="header-bar">
        <h2 className="gradient-text">Admin Panel: Manage Users</h2>
        <button className="btn btn-outline-dark logout-btn" onClick={logoutHandler}>Logout</button>
      </div>

      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="row">
        <div className="col scroll-panel">
          <h4 className="section-title">Students</h4>
          {students.length === 0 ? <p>No students found.</p> : students.map(user => (
            <div key={user._id} className="user-card">
              {editingUser === user._id ? (
                <>
                  <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" />
                  <input name="email" value={form.email} onChange={handleChange} className="form-control mb-2" />
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-control mb-2" />
                  <select name="role" value={form.role} onChange={handleChange} className="form-select mb-2">
                    <option value="student">Student</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                  <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <button className="btn btn-primary me-2" onClick={() => startEdit(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="col scroll-panel">
          <h4 className="section-title">Recruiters</h4>
          {recruiters.length === 0 ? <p>No recruiters found.</p> : recruiters.map(user => (
            <div key={user._id} className="user-card">
              {editingUser === user._id ? (
                <>
                  <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" />
                  <input name="email" value={form.email} onChange={handleChange} className="form-control mb-2" />
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-control mb-2" />
                  <select name="role" value={form.role} onChange={handleChange} className="form-select mb-2">
                    <option value="student">Student</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                  <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <button className="btn btn-primary me-2" onClick={() => startEdit(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .admin-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }

        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .logout-btn {
          padding: 8px 16px;
          font-weight: 500;
        }

        .gradient-text {
          background: linear-gradient(to right, #007bff, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .search-bar input {
          max-width: 400px;
          margin: auto;
          display: block;
        }

        .row {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .col {
          flex: 1;
          min-width: 300px;
        }

        .scroll-panel {
          max-height: 600px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .scroll-panel::-webkit-scrollbar {
          width: 8px;
        }

        .scroll-panel::-webkit-scrollbar-thumb {
          background-color: #007bff;
          border-radius: 4px;
        }

        .scroll-panel::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
        }

        .user-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .form-control, .form-select {
          font-size: 15px;
                   padding: 10px;
        }

        .btn {
          font-weight: 500;
        }

        .btn-success {
          background-color: #28a745;
          border: none;
        }

        .btn-danger {
          background-color: #dc3545;
          border: none;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
        }

        .btn-outline-dark {
          border: 1px solid #333;
          color: #333;
          background-color: transparent;
        }

        .btn-outline-dark:hover {
          background-color: #333;
          color: #fff;
        }

        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default Admin;