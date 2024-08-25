import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaCar, FaStar, FaTachometerAlt } from "react-icons/fa";

function Root() {
  const location = useLocation();

  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ height: '100vh' }}>
        <Col xs={2} className="p-0" style={{ backgroundColor: '#343a40', color: 'white' }}>
          <Navbar bg="dark" variant="dark" className="flex-column vh-100 align-items-start p-3" style={{ position: 'fixed', top: 0, left: 0, width: '16.6667%' }}>
            <div className="sidebar-header mb-4">
              <Link to="/" className="text-white text-decoration-none" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                🚗🚗Car Market🚗🚗
              </Link>
            </div>
            <Nav className="flex-column w-100">
              <Nav.Link
                as={Link}
                to="/Dashboard"
                style={{
                  color: location.pathname === "/Dashboard" ? '#ffc107' : 'white',
                  backgroundColor: location.pathname === "/Dashboard" ? '#495057' : 'transparent',
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaTachometerAlt style={{ marginRight: '10px' }} />
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/CarList"
                style={{
                  color: location.pathname === "/CarList" ? '#ffc107' : 'white',
                  backgroundColor: location.pathname === "/CarList" ? '#495057' : 'transparent',
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaCar style={{ marginRight: '10px' }} />
                Car List
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Hightlight"
                style={{
                  color: location.pathname === "/Hightlight" ? '#ffc107' : 'white',
                  backgroundColor: location.pathname === "/Hightlight" ? '#495057' : 'transparent',
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaStar style={{ marginRight: '10px' }} />
                Highlight Car
              </Nav.Link>
            </Nav>
          </Navbar>
        </Col>
        <Col xs={{ span: 10, offset: 2 }} style={{ padding: '20px', marginLeft: '16.6667%' }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Root;
