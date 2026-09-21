export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type TokenPriority = 'NORMAL' | 'PRIORITY' | 'EMERGENCY';

export type TokenStatus = 
  | 'WAITING' 
  | 'CALLED' 
  | 'IN_CONSULTATION' 
  | 'COMPLETED' 
  | 'SKIPPED' 
  | 'ABSENT' 
  | 'CANCELLED';

export type AppointmentStatus = 
  | 'SCHEDULED' 
  | 'CHECKED_IN' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'NO_SHOW';

export type EventType = 
  | 'TOKEN_CREATED' 
  | 'CALLED' 
  | 'RECALLED' 
  | 'STARTED' 
  | 'COMPLETED' 
  | 'SKIPPED' 
  | 'ABSENT' 
  | 'CANCELLED' 
  | 'PAUSED' 
  | 'RESUMED';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  average_consultation_minutes: number;
  is_active: boolean;
  created_at: string;
}

export interface Doctor {
  id: string;
  profile_id: string;
  department_id: string;
  specialization: string;
  room_number: string;
  average_consultation_minutes: number;
  is_available: boolean;
  created_at: string;
  profile?: Profile;
  department?: Department;
}

export interface Patient {
  id: string;
  profile_id: string;
  date_of_birth?: string | null;
  gender?: string | null;
  address?: string | null;
  created_at: string;
  profile?: Profile;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  created_at: string;
  patient?: Patient;
  doctor?: Doctor;
  department?: Department;
}

export interface Queue {
  id: string;
  department_id: string;
  doctor_id: string;
  queue_date: string;
  current_token_id?: string | null;
  is_paused: boolean;
  created_at: string;
  department?: Department;
  doctor?: Doctor;
  current_token?: Token;
}

export interface Token {
  id: string;
  token_number: number;
  display_token: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  appointment_id?: string | null;
  priority: TokenPriority;
  status: TokenStatus;
  queue_date: string;
  created_at: string;
  called_at?: string | null;
  completed_at?: string | null;
  patient?: Patient;
  doctor?: Doctor;
  department?: Department;
}

export interface QueueEvent {
  id: string;
  token_id: string;
  queue_id: string;
  event_type: EventType;
  created_by?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface QueueAnalytics {
  totalPatientsToday: number;
  tokensGenerated: number;
  patientsWaiting: number;
  patientsInConsultation: number;
  completedConsultations: number;
  skippedCount: number;
  absentCount: number;
  emergencyCount: number;
  averageWaitingTimeMinutes: number;
  departmentDistribution: { name: string; count: number; code: string }[];
  hourlyActivity: { hour: string; count: number }[];
}
