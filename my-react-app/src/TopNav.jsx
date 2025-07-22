import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar expand="md" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#FFD700',
            textDecoration: 'none',
            fontFamily: 'Segoe UI, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Job Portal
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#FFD700"
            className="bi bi-briefcase-fill"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
            <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
          </svg>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login' )&& (
              <Nav.Link onClick={() => navigate('/views')}>Explore Jobs</Nav.Link>
            )}
            {(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/views') && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
            {(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/views') && (
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;