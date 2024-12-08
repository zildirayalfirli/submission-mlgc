import { Firestore } from '@google-cloud/firestore';

export async function storeData(id, data) {
    const db = new Firestore({
        projectId: 'submissionmlgc-zildirayalfirli',
        keyFilename: './submissionmlgc-zildirayalfirli-9c30488c4172.json',
    });
    const predictCollection = db.collection('predictions');
    await predictCollection.doc(id).set(data);
}
