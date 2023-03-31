import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const session = await getSession({ req });
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
