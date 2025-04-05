import express from 'express';
import { getAllForms, submitForm } from '../controller/formcontroller.js';

const router = express.Router();

router.post('/submit', submitForm);
router.get('/all', getAllForms);

export default router;