import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;
    // acesso ao mongodb e obter os usuários do meu banco
    const { db } = await connectToDatabase();
    
    switch (method) {
      case 'GET':
        const data = await db.collection('user').find().toArray();
        res.status(200).json(data);
        break;
      case 'POST':
        if (body) {
          await db.collection('user').insert({ name: body.name });
          res.json({ message: 'Cadastro realizado com sucesso!' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;
