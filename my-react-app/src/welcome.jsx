import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import UploadResumeButton from './UploadResumeButton.jsx';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { clearUser } from './redux/userslice';
import { persistor } from './redux/store';

function WelcomeComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user.user);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(user?.resume || null);

  const hasResume = useMemo(() => Boolean(resumeUrl), [resumeUrl]);

  const handleLogout = useCallback(async () => {
    document.cookie = 'token=; path=/; max-age=0';
    localStorage.removeItem('token');
    dispatch(clearUser());
    await persistor.purge();

    toast.success('Logged out successfully', {
      position: 'top-center',
      autoClose: 3000
    });

    navigate('/');
  }, [dispatch, navigate]);

  const handleResumeUpload = useCallback(async () => {
    if (!resumeFile) {
      toast('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userId', user._id);

    try {
      const response = await axios.post(`${API_BASE_URL}/kishor/upload-resume`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Resume uploaded!');
      setResumeUrl(response.data.resume);
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    }
  }, [resumeFile, user]);

  const handleResumeDownload = useCallback(async () => {
    try {
      const response = await axios.get(resumeUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error('Unable to download resume');
    }
  }, [resumeUrl]);

  if (!user) return <div className="text-center mt-5 text-danger">No user data available</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div
        style={{
          width: '300px',
          backgroundColor: '#ffffff',
          padding: '30px 20px',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)'
        }}
      >
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              border: '3px solid #00c6ff'
            }}
          />
        )}

        <h4 className="fw-bold text-center">{user.name}</h4>
        <p className="text-muted text-center">{user.role}</p>
        <div className="mt-3 w-100">
          <p><strong> Phone:</strong> {user.phone}</p>
          <p><strong> Email:</strong> {user.email || 'Not provided'}</p>
        </div>

        <button onClick={handleLogout} className="btn btn-danger mt-auto w-100 mb-2 rounded-pill">
          Logout
        </button>

        <button
          onClick={() => navigate('/edit-profile')}
          className="btn btn-outline-secondary w-100 rounded-pill"
        >
          Edit Profile
        </button>
      </div>

      <div style={{ flex: 1, padding: '40px' }}>
        <h2 className="mb-4 fw-bold text-gradient">Welcome to Your Dashboard</h2>
        <p className="text-muted mb-4">Manage your profile, upload your resume, and explore job opportunities tailored for you.</p>

        <div className="card shadow-lg p-4 mb-4 rounded-4" style={{ maxWidth: '700px', backgroundColor: '#ffffff' }}>
          <h5 className="mb-3 fw-semibold"> Upload Your Resume</h5>

          {hasResume ? (
            <div className="d-flex gap-3 flex-column flex-md-row">
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                className="btn btn-outline-primary w-100 rounded-pill"
              >
                Preview Resume
              </button>
              <button
                onClick={handleResumeDownload}
                className="btn btn-outline-success w-100 rounded-pill"
              >
                Download Resume
              </button>
            </div>
          ) : (
            <>
              <UploadResumeButton onResumeSelected={(file) => setResumeFile(file)} />
              <button onClick={handleResumeUpload} className="btn btn-success mt-3 w-100 rounded-pill">
                Upload Resume
              </button>
            </>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card p-4 shadow-sm h-100 rounded-4">
              <h6 className="fw-bold">Job Preferences</h6>
              <p className="text-muted">Set your interest areas, preferred locations, job type, and availability.</p>
              <button className="btn btn-outline-primary btn-sm rounded-pill">Edit Preferences</button>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card p-4 shadow-sm h-100 rounded-4">
              <h6 className="fw-bold"> Explore Jobs</h6>
              <p className="text-muted">Browse jobs posted by recruiters and apply to ones that match your interest.</p>
              <button
                className="btn btn-outline-success btn-sm rounded-pill"
                onClick={() => navigate('/explore-jobs')}
              >
                View Jobs
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .text-gradient {
            background: linear-gradient(to right, #007bff, #00c6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </div>
    </div>
  );
}

export default React.memo(WelcomeComponent); 
