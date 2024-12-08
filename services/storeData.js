import { Firestore } from '@google-cloud/firestore';

export async function storeData(id, data) {
    const db = new Firestore({
        projectId: 'mlcc-4235f',
        keyFilename: './submissionmlgc-zildirayalfirli-c305c2b95c93.json',
    });
    const predictCollection = db.collection('predictions');
    await predictCollection.doc(id).set(data);
}
