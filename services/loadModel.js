import * as tf from '@tensorflow/tfjs';

export async function loadModel() {
    try {
        console.log("Loading model...");
        const model = await tf.loadGraphModel('https://storage.googleapis.com/cancer-zildirayalfirli/model.json');
        console.log("Model loaded successfully.");
        return model;
    } catch (error) {
        console.error("Model loading error:", error.message);
        throw new Error("Model tidak ditemukan atau gagal dimuat.");
    }
}
