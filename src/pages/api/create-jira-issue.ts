import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, projectKey } = req.body;

    // Validate input
    if (!title || !description || !projectKey) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const response = await fetch(`http://localhost:1080/rest/api/2/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from('your-email:your-api-token').toString('base64')}`,
        },
        body: JSON.stringify({
          fields: {
            project: {
              key: projectKey,
            },
            summary: title,
            description: description,
            issuetype: {
              name: 'Bug', // Change this to the desired issue type
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.message });
      }

      const data = await response.json();
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error: ' + error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}