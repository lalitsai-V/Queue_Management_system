import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
  code: z.string().min(2, 'Code (e.g. GM, CAR) is required').max(6),
  description: z.string().optional(),
  averageConsultationMinutes: z.number().min(1).max(120).default(10),
  isActive: z.boolean().default(true),
});

export const doctorSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  departmentId: z.string().min(1, 'Department is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  roomNumber: z.string().min(1, 'Room number is required'),
  averageConsultationMinutes: z.number().min(1).default(10),
  isAvailable: z.boolean().default(true),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;
export type DoctorInput = z.infer<typeof doctorSchema>;
