import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TopNav from './TopNav';
import Login from './login';
import SignUp from './signup';
import Home from './Home'; 
import Logout from './logout';
import Welcome from './welcome.jsx'; 
import { ToastContainer } from 'react-toastify';
import Recruit from './Recruit.jsx';
import ExploreJobs from './ExploreJobs';
import EditProfile from './EditProfile';
import EditRecruiter from './EditRecruiter';
import Views from './View.jsx'; 
import Admin from './admin.jsx';

function App() {
  return (
    <>
      <TopNav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/explore-jobs" element={<ExploreJobs />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-recruiter" element={<EditRecruiter />} />
        <Route path="/views" element={<Views />} /> 
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
