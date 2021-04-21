import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
var ObjectId = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    let data = req.body;
    let doc = await req.db.collection('posts').deleteOne({ _id: ObjectId(data._id) });
    res.status(200).json({ message: 'ok' });
});

export default handler;
