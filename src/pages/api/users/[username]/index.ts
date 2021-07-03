import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../utils/mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, query } = req;

    const objectid = new ObjectId(String(query.username));

    switch (method) {
      case 'GET':
        const { db } = await connectToDatabase();
        const data = await db.collection('user').findOne({ "_id": objectid });

        res.status(200).json({
          method,
          user: data,
        });
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
