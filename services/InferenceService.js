import * as tf from '@tensorflow/tfjs';
import sharp from 'sharp';

async function preprocessImage(image) {
    const resizedImage = await sharp(image)
        .resize(224, 224)
        .raw()
        .toBuffer();
    return tf.tensor3d(new Uint8Array(resizedImage), [224, 224, 3]).expandDims().toFloat();
}

export async function predictClassification(model, image) {
    const tensor = await preprocessImage(image);
    const prediction = model.predict(tensor);
    const scores = await prediction.data();
    const confidenceScore = Math.max(...scores) * 100;
    const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';
    const suggestion = label === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';
    return { confidenceScore, label, suggestion };
}
