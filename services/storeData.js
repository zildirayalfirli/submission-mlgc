import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

const credentials = typeof process.env.FIRESTORE === 'string'
    ? JSON.parse(process.env.FIRESTORE)
    : process.env.FIRESTORE;

export async function storeData(id, data) {
    try {
        const db = new Firestore({
            projectId: credentials.project_id,
            credentials,
        });

        const predictCollection = db.collection('predictions');
        await predictCollection.doc(id).set(data);
        console.log(`Data with ID ${id} successfully stored.`);
    } catch (error) {
        console.error("Error storing data to Firestore:", error.message);
        throw new Error("Failed to store data to Firestore.");
    }
}
