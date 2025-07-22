import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ExploreJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    category: ''
  });

  const navigate = useNavigate();

  const fetchAllJobs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kishor/jobs`, {
        withCredentials: true
      });

      console.log('Fetched Jobs:', response.data);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch job listings');
    }
  }, []);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

const [searchQuery, setSearchQuery] = useState('');

 useEffect(() => {
  let filtered = jobs;

  if (filters.location) {
    filtered = filtered.filter((job) =>
      job.location.toLowerCase() === filters.location.toLowerCase()
    );
  }

  if (filters.type) {
    filtered = filtered.filter((job) =>
      job.type.toLowerCase() === filters.type.toLowerCase()
    );
  }

  if (filters.category) {
    filtered = filtered.filter((job) =>
      job.title.toLowerCase().includes(filters.category.toLowerCase())
    );
  }

  if (searchQuery.trim()) {
    filtered = filtered.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }

  setFilteredJobs(filtered);
}, [filters, jobs, searchQuery]);


  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const locationOptions = useMemo(
    () => ['Hyderabad', 'Delhi', 'Mumbai', 'Pune'],
    []
  );

  const typeOptions = useMemo(
    () => ['Fulltime', 'Part time', 'Internship', 'Contract'],
    []
  );

  const categoryOptions = useMemo(
    () => ['Software Developer', 'Marketing', 'HR'],
    []
  );

  return (
    <div className="container mt-5">
      <button
        className="btn"
        style={{
          background: 'linear-gradient(to right, #ff8400ff, #ff1900ff)',
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

      <h2 className="text-center mb-5 fw-bold text-gradient">
        Explore Exciting Job Opportunities
      </h2>

      <div className="mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search by job title..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <select name="location" className="form-select" onChange={handleFilterChange}>
            <option value="">All Locations</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select name="type" className="form-select" onChange={handleFilterChange}>
            <option value="">All Types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select name="category" className="form-select" onChange={handleFilterChange}>
            <option value="">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="row">
        {filteredJobs.map((job) => (
          <div key={job._id} className="col-12 mb-4">
            <div className="card job-card shadow-sm border-0 rounded-4 p-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h4 className="fw-bold text-primary">{job.title}</h4>
                  <div className="mb-2">
                    <span className="badge bg-light text-dark me-2">{job.location}</span>
                    <span className="badge bg-secondary">{job.type}</span>
                  </div>
                  <p className="text-muted mb-2">
                    {job.description.length > 200
                      ? job.description.slice(0, 200) + '...'
                      : job.description}
                  </p>
                  {job.recruiterId && (
                    <div className="small text-muted">
                      <strong>Posted by:</strong> {job.recruiterId.name} ({job.recruiterId.email})
                    </div>
                  )}
                </div>
                <div className="mt-3 mt-md-0 text-md-end">
                  <button className="btn btn-apply px-4 py-2 rounded-pill">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #007bff, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .job-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .btn-apply {
          background: linear-gradient(to right, #007bff, #00c6ff);
          color: white;
          border: none;
          font-weight: 600;
          transition: transform 0.2s ease;
        }

        .btn-apply:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default React.memo(ExploreJobs);
