import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './redux/userslice';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { persistor } from './redux/store';

function RecruitComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');

  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
  });

  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    document.cookie = 'token=; path=/; max-age=0';
    localStorage.removeItem('token');
    dispatch(clearUser());
    await persistor.purge();
    toast.success('Logged out successfully', { position: 'top-center', autoClose: 3000 });
    navigate('/');
  }, [dispatch, navigate]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kishor/jobs/recruiter/${user._id}`);
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to load jobs');
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) fetchJobs();
  }, [fetchJobs, user?._id]);

  const handlePostJob = useCallback(async () => {
    if (!jobTitle.trim() || !jobDescription.trim() || !location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const jobData = {
      recruiterId: user?._id,
      title: jobTitle.trim(),
      description: jobDescription.trim(),
      location: location.trim(),
      type: jobType,
    };

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/kishor/jobs/post`, jobData, { withCredentials: true });
      toast.success('Job posted successfully!');
      setJobTitle('');
      setJobDescription('');
      setLocation('');
      setJobType('Full-time');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  }, [jobTitle, jobDescription, location, jobType, user?._id, fetchJobs]);

  const handleEditClick = useCallback((job) => {
    setEditingJobId(job._id);
    setEditedJob({
      title: job.title,
      description: job.description,
      location: job.location,
      type: job.type,
    });
  }, []);

  const handleUpdateJob = useCallback(
    async (id) => {
      try {
        await axios.put(`${API_BASE_URL}/kishor/jobs/${id}`, editedJob);
        toast.success('Job updated');
        setEditingJobId(null);
        fetchJobs();
      } catch {
        toast.error('Failed to update job');
      }
    },
    [editedJob, fetchJobs]
  );

  const handleDeleteJob = useCallback(
    async (id) => {
      if (!window.confirm('Are you sure you want to delete this job?')) return;
      try {
        await axios.delete(`${API_BASE_URL}/kishor/jobs/${id}`);
        toast.success('Job removed');
        fetchJobs();
      } catch {
        toast.error('Failed to delete job');
      }
    },
    [fetchJobs]
  );

  const renderedJobs = useMemo(
    () =>
      jobs.map((job) => (
        <div
          key={job._id}
          className="job-card"
          style={{
            background: '#fff',
            color: '#222',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '18px',
            boxShadow: '0 10px 20px rgba(0, 123, 255, 0.15)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 123, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 123, 255, 0.15)';
          }}
        >
          {editingJobId === job._id ? (
            <>
              <input
                value={editedJob.title}
                onChange={(e) => setEditedJob({ ...editedJob, title: e.target.value })}
                style={inputStyle}
                placeholder="Job Title"
              />
              <textarea
                value={editedJob.description}
                onChange={(e) => setEditedJob({ ...editedJob, description: e.target.value })}
                rows="3"
                style={inputStyle}
                placeholder="Job Description"
              />
              <input
                value={editedJob.location}
                onChange={(e) => setEditedJob({ ...editedJob, location: e.target.value })}
                style={inputStyle}
                placeholder="Location"
              />
              <select
                value={editedJob.type}
                onChange={(e) => setEditedJob({ ...editedJob, type: e.target.value })}
                style={inputStyle}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
              <div style={{ marginTop: '10px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={() => handleUpdateJob(job._id)}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingJobId(null)}
                  style={{ backgroundColor: '#bbb', color: '#222' }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: '6px', color: '#007BFF' }}>{job.title}</h4>
              <p style={{ fontSize: '14px', marginBottom: '6px', color: '#555' }}>{job.description}</p>
              <small style={{ color: '#888' }}>
                📍 {job.location} &nbsp; • &nbsp; 🕒 {job.type}
              </small>
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={() => handleEditClick(job)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteJob(job._id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )),
    [jobs, editingJobId, editedJob, handleDeleteJob, handleEditClick, handleUpdateJob]
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: #e9f0ff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .btn {
          padding: 10px 18px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 123, 255, 0.15);
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          box-shadow: 0 6px 15px rgba(0, 86, 179, 0.3);
        }
        .btn-danger {
          background-color: #dc3545;
          color: white;
          box-shadow: 0 4px 10px rgba(220, 53, 69, 0.15);
        }
        .btn-danger:hover {
          background-color: #a71d2a;
          box-shadow: 0 6px 15px rgba(167, 29, 42, 0.3);
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
        .btn-secondary:hover {
          background-color: #565e64;
        }

        input, select, textarea {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          border-radius: 12px;
          border: 1.8px solid #cbd5e1;
          padding: 14px 16px;
          margin-bottom: 18px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
          box-shadow: 0 2px 6px rgba(100, 116, 139, 0.06);
          width: 100%;
          resize: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 10px #a3caff88;
        }

        ::placeholder {
          color: #a3b1c2;
        }

        /* Scrollbar for job list */
        .jobs-list {
          max-height: 80vh;
          overflow-y: auto;
          padding-right: 8px;
        }
        .jobs-list::-webkit-scrollbar {
          width: 8px;
        }
        .jobs-list::-webkit-scrollbar-thumb {
          background-color: #007bff66;
          border-radius: 12px;
        }

      `}</style>

      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: 320,
            background:
              'linear-gradient(135deg, #1e40af 0%, #2563eb 70%, #3b82f6 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 24px',
            boxShadow: '4px 0 16px rgba(50, 70, 120, 0.2)',
          }}
        >
          <h2
            style={{
              fontWeight: '700',
              fontSize: '1.8rem',
              marginBottom: 30,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Recruiter Hub
          </h2>

          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                objectFit: 'cover',
                border: '4px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            />
          ) : (
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 18,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                userSelect: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              ?
            </div>
          )}

          <p
            style={{
              marginTop: 16,
              fontWeight: 600,
              fontSize: '1.1rem',
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}
          >
            {user?.name || 'Recruiter Name'}
          </p>
          <p
            style={{
              fontSize: 14,
              opacity: 0.8,
              marginTop: 6,
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {user?.email || 'recruiter@example.com'}
          </p>

          <button
            onClick={() => navigate('/edit-recruiter')}
            className="btn btn-primary"
            style={{ marginTop: 28, width: '100%', fontSize: '1rem' }}
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ marginTop: 30, width: '100%', fontSize: '1rem' }}
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main
          style={{
            display: 'flex',
            flex: 1,
            padding: '50px 40px',
            gap: 40,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: '#e9f0ff',
          }}
        >
          {/* Job Posting Form */}
          <section
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 12px 36px rgba(0, 123, 255, 0.12)',
              flex: '1 1 55%',
              minWidth: 340,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,123,255,0.2)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,123,255,0.12)')
            }
          >
            <h2
              style={{
                color: '#1e40af',
                fontWeight: '700',
                marginBottom: 12,
                letterSpacing: '0.05em',
              }}
            >
              Post a New Job
            </h2>
            <p style={{ color: '#4b5563', marginBottom: 30, fontWeight: 500 }}>
              Share your job opening and attract the best global talent.
            </p>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              style={inputStyle}
            />
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Job Description"
              rows={6}
              style={inputStyle}
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              style={inputStyle}
            />
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={inputStyle}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <button
              onClick={handlePostJob}
              disabled={loading}
              className="btn btn-primary"
              style={{ marginTop: 12, fontSize: '1.1rem' }}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </section>

          {/* Jobs Listing on Right Side */}
          <section
            className="jobs-list"
            style={{
              flex: '1 1 20%',
              minWidth: 30,
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: 8,
            }}
          >
            <h3
              style={{
                marginBottom: 26,
                color: '#1e40af',
                fontWeight: 700,
                letterSpacing: '0.03em',
              }}
            >
              Your Jobs
            </h3>
            {renderedJobs.length ? (
              renderedJobs
            ) : (
              <p style={{ color: '#4b5563', fontStyle: 'italic' }}>
                No jobs posted yet. Start by adding a new job!
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '12px',
  border: '1.8px solid #cbd5e1',
  marginBottom: '18px',
  fontSize: '15px',
  outline: 'none',
  boxShadow: '0 2px 6px rgba(100, 116, 139, 0.06)',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

export default React.memo(RecruitComponent);
