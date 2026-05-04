import express from 'express';
import { createRequest, getAllRequests, approveRequest } from '../controllers/memberRequestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getAllRequests);
router.put('/:requestId/approve', approveRequest);

export default router;
