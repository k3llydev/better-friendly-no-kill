import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import { renderFile } from 'ejs';
import { writeFileSync } from 'fs';
import { helpers as $helpers } from './utils/helpers';

if(!process.env.MONGO_URL) throw new Error('Mongo URL was not provided.');
const client = new MongoClient(process.env.MONGO_URL);

(async () => {
    await client.connect();
    const db = client.db('prod');
    const usersCollection = db.collection('users');

    const users = await usersCollection.find().toArray();
    client.close();

    renderFile('./src/index.ow2', { users, $helpers }, (error, content) => {
        if(error) return console.error(error);
        writeFileSync('./out/BetterFriendlyNoKill.ow2', content);
        console.log('Build success!');
    });

})();
