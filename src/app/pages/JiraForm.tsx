'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const JiraForm = () => {
  const { data: session } = useSession();

  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!issueTitle || !issueDescription) {
      setError('Both fields are required.');
      return;
    }

    const response = await fetch('/api/create-jira-issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session}`,
      },
      body: JSON.stringify({ title: issueTitle, description: issueDescription, projectKey: 'TEST' }),
    });

    if (!response.ok) {
      setError('Failed to create issue. Please try again.');
      return;
    }

    // Clear the form
    setIssueTitle('');
    setIssueDescription('');
    alert('Issue created successfully!');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="input" placeholder="Enter email"
         value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
          required
         />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={issueDescription} 
        onChange={(e) => setIssueDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default JiraForm;