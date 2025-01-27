'use client';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { signIn, signOut, useSession } from 'next-auth/react';


function Navigation() {
  const { data: session } = useSession();

  return (
    <Navbar expand="lg"  bg="light" className="bg-body-tertiary rounded navbar-spacing">
      <Container>
        <Navbar.Brand href="/">DevOps Tools</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
          {session ? (
              <>
                <Nav.Link as={Link} to="/jira-form">
                  <Button variant="primary">Support Ticket erstellen</Button>
                </Nav.Link>
                <Button variant="secondary" onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => signIn('jira')}>Login with JIRA</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;