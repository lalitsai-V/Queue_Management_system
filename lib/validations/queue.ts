import { z } from 'zod';

export const generateTokenSchema = z.object({
  departmentId: z.string().min(1, 'Please select a department'),
  doctorId: z.string().min(1, 'Please select a doctor'),
  priority: z.enum(['NORMAL', 'PRIORITY', 'EMERGENCY']).default('NORMAL'),
  appointmentId: z.string().optional().nullable(),
});

export const updateQueueStatusSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
  action: z.enum(['CALL_NEXT', 'START', 'COMPLETE', 'SKIP', 'ABSENT', 'RECALL']),
});

export type GenerateTokenInput = z.infer<typeof generateTokenSchema>;
