import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import predictRoutes from './routes/predictRoutes.js';
import { loadModel } from './services/loadModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

(async () => {
    try {
        const model = await loadModel();
        app.locals.model = model;

        app.use(cors());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/', predictRoutes);

        app.use((err, req, res, next) => {
            if (err instanceof Error && err.message === 'File too large') {
                return res.status(413).json({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000',
                });
            }
            if (err.type === 'entity.too.large') {
                return res.status(413).json({
                    status: 'fail',
                    message: `Payload content length greater than maximum allowed: ${err.limit}`,
                });
            }
            res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Internal Server Error',
            });
        });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
})();
