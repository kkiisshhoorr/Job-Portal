import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './utils/constraints';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Views() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/kishor/jobs`);
        console.log('Views Job Preview:', response.data);
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err.message);
        toast.error('Failed to load jobs');
      }
    };
    fetchJobs();
  }, []);


  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return jobs;
    return jobs.filter((job) => job.title.toLowerCase().includes(query));
  }, [jobs, searchQuery]);


  const handleSearch = useCallback(() => {
  
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

   const handleViewDetails = useCallback(() => {
    toast.info('Please login to view job details');
    navigate('/login'); 
  }, [navigate]);


  return (
    <div className="container py-5" style={{ backgroundColor: '#fafbfc', minHeight: '100vh' }}>

      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Find Your Next Career Move</h1>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Search by job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row g-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onViewDetails={handleViewDetails} />
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">No jobs found</div>
          </div>
        )}
      </div>
    </div>
  );
}

const JobCard = React.memo(({ job, onViewDetails }) => (
  <div className="col-md-6 col-lg-4">
    <div className="card h-100 border-0 shadow-sm rounded">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{job.title}</h5>
        <p className="text-muted mb-4">
          <i className="bi bi-geo-alt-fill me-2"></i>
          {job.location}
        </p>
        <div className="mt-auto">
          <button className="btn btn-outline-primary w-100" onClick={onViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
));

export default React.memo(Views);
