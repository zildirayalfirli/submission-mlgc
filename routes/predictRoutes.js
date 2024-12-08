import { Router } from 'express';
import multer from 'multer';
import { postPredictHandler, predictHistories } from '../controllers/predictController.js';

const router = Router();

const upload = multer({
    limits: { fileSize: 1000 * 1000 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});

router.post('/predict', upload.single('image'), postPredictHandler);
router.get('/predict/histories', predictHistories);

export default router;
