import { validateImageDimensions } from '../utils/validateImageDimensions.js';
import { predictClassification } from '../services/InferenceService.js';
import { storeData } from '../services/storeData.js';
import crypto from 'crypto';
import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

export async function postPredictHandler(req, res) {
    try {
        console.log("File received:", req.file);
        console.log("Request body:", req.body);

        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No file uploaded. Use the 'image' field to upload your file.",
            });
        }

        const imageBuffer = req.file.buffer;

        const isValidDimensions = await validateImageDimensions(imageBuffer);
        if (!isValidDimensions) {
            return res.status(400).json({
                status: "fail",
                message: "Terjadi kesalahan dalam melakukan prediksi",
            });
        }

        const { model } = req.app.locals;

        const { confidenceScore, label, suggestion } = await predictClassification(model, imageBuffer);

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        const data = { id, result: label, suggestion, createdAt };
        await storeData(id, data);

        return res.status(201).json({
            status: "success",
            message: confidenceScore > 99
                ? "Model predicted successfully"
                : "Model predicted successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export async function predictHistories(req, res) {
    try {
        const credentials = typeof process.env.FIRESTORE === 'string'
            ? JSON.parse(process.env.FIRESTORE)
            : process.env.FIRESTORE;

        const db = new Firestore({
            projectId: credentials.project_id,
            credentials,
        });

        const predictCollection = db.collection('predictions');
        const snapshot = await predictCollection.get();
        const result = snapshot.docs.map(doc => ({
            id: doc.id,
            history: doc.data(),
        }));

        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}


