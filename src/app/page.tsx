'use client';
import { Col, Container, Row } from "react-bootstrap";
import JiraForm from "./pages/JiraForm";
import Navigation from "./components/Navigation";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Router>
        <Container fluid="sm" className="justify-content-md-center">
          <Row>
            <Col>
              <Navigation />
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/jira-form" element={<JiraForm />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </SessionProvider>

  );
}