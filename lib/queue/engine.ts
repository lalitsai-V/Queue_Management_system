import { Token, Queue, TokenPriority, TokenStatus, QueueAnalytics } from '@/types/queue';
import { INITIAL_TOKENS, INITIAL_QUEUES, INITIAL_DEPARTMENTS, INITIAL_DOCTORS, INITIAL_PATIENTS } from './data';

// Global mock state container for demo execution when offline / unconfigured DB
class QueueStateStore {
  tokens: Token[] = [...INITIAL_TOKENS];
  queues: Queue[] = [...INITIAL_QUEUES];
  departments = [...INITIAL_DEPARTMENTS];
  doctors = [...INITIAL_DOCTORS];
  patients = [...INITIAL_PATIENTS];

  getTokenById(id: string): Token | undefined {
    return this.tokens.find((t) => t.id === id);
  }

  getTokensForDoctor(doctorId: string): Token[] {
    return this.tokens.filter((t) => t.doctor_id === doctorId);
  }

  getWaitingTokensForDoctor(doctorId: string): Token[] {
    const tokens = this.getTokensForDoctor(doctorId).filter((t) => t.status === 'WAITING');
    
    // Sort by Priority (EMERGENCY > PRIORITY > NORMAL) then created_at
    const priorityWeight: Record<TokenPriority, number> = {
      EMERGENCY: 1,
      PRIORITY: 2,
      NORMAL: 3,
    };

    return tokens.sort((a, b) => {
      const pDiff = priorityWeight[a.priority] - priorityWeight[b.priority];
      if (pDiff !== 0) return pDiff;
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
  }

  getPatientsAhead(displayToken: string, doctorId: string): { patientsAhead: number; position: number } {
    const targetToken = this.tokens.find((t) => t.display_token === displayToken || t.id === displayToken);
    if (!targetToken || targetToken.status !== 'WAITING') {
      return { patientsAhead: 0, position: 1 };
    }

    const waitingQueue = this.getWaitingTokensForDoctor(targetToken.doctor_id || doctorId);
    const index = waitingQueue.findIndex((t) => t.id === targetToken.id);

    if (index === -1) return { patientsAhead: 0, position: 1 };

    return {
      patientsAhead: index,
      position: index + 1,
    };
  }

  calculateWaitTimeMinutes(patientsAhead: number, avgMinutes: number = 10): number {
    return Math.max(0, patientsAhead * avgMinutes);
  }

  generateToken(
    departmentId: string,
    doctorId: string,
    patientId: string = 'pat-1',
    priority: TokenPriority = 'NORMAL'
  ): Token {
    const dept = this.departments.find((d) => d.id === departmentId) || this.departments[0];
    const doc = this.doctors.find((d) => d.id === doctorId) || this.doctors[0];
    const pat = this.patients.find((p) => p.id === patientId) || this.patients[0];

    const todayStr = new Date().toISOString().split('T')[0];
    const existingTokensToday = this.tokens.filter(
      (t) => t.department_id === departmentId && t.doctor_id === doctorId && t.queue_date === todayStr
    );

    const nextTokenNum = existingTokensToday.length + 1;
    const displayToken = `${dept.code}-${String(nextTokenNum).padStart(3, '0')}`;

    const newToken: Token = {
      id: `tok-${Date.now()}`,
      token_number: nextTokenNum,
      display_token: displayToken,
      patient_id: pat.id,
      doctor_id: doc.id,
      department_id: dept.id,
      priority,
      status: 'WAITING',
      queue_date: todayStr,
      created_at: new Date().toISOString(),
      patient: pat,
      doctor: doc,
      department: dept,
    };

    this.tokens.push(newToken);
    return newToken;
  }

  callNextPatient(doctorId: string): { success: boolean; token?: Token; message?: string } {
    const queue = this.queues.find((q) => q.doctor_id === doctorId);
    if (queue && queue.is_paused) {
      return { success: false, message: 'Queue is currently paused by doctor.' };
    }

    const waiting = this.getWaitingTokensForDoctor(doctorId);
    if (waiting.length === 0) {
      return { success: false, message: 'No waiting patients in queue.' };
    }

    const nextToken = waiting[0];
    nextToken.status = 'CALLED';
    nextToken.called_at = new Date().toISOString();

    if (queue) {
      queue.current_token_id = nextToken.id;
      queue.current_token = nextToken;
    }

    return { success: true, token: nextToken };
  }

  startConsultation(tokenId: string): { success: boolean; token?: Token } {
    const token = this.getTokenById(tokenId);
    if (!token) return { success: false };

    token.status = 'IN_CONSULTATION';
    return { success: true, token };
  }

  completeConsultation(tokenId: string): { success: boolean; token?: Token } {
    const token = this.getTokenById(tokenId);
    if (!token) return { success: false };

    token.status = 'COMPLETED';
    token.completed_at = new Date().toISOString();

    const queue = this.queues.find((q) => q.doctor_id === token.doctor_id);
    if (queue && queue.current_token_id === tokenId) {
      queue.current_token_id = null;
      queue.current_token = undefined;
    }

    return { success: true, token };
  }

  updateTokenStatus(tokenId: string, status: TokenStatus): { success: boolean; token?: Token } {
    const token = this.getTokenById(tokenId);
    if (!token) return { success: false };

    token.status = status;
    return { success: true, token };
  }

  toggleQueuePause(doctorId: string): boolean {
    const queue = this.queues.find((q) => q.doctor_id === doctorId);
    if (queue) {
      queue.is_paused = !queue.is_paused;
      return queue.is_paused;
    }
    return false;
  }

  getAnalytics(): QueueAnalytics {
    const total = this.tokens.length;
    const waiting = this.tokens.filter((t) => t.status === 'WAITING').length;
    const inConsultation = this.tokens.filter((t) => t.status === 'IN_CONSULTATION').length;
    const completed = this.tokens.filter((t) => t.status === 'COMPLETED').length;
    const skipped = this.tokens.filter((t) => t.status === 'SKIPPED').length;
    const absent = this.tokens.filter((t) => t.status === 'ABSENT').length;
    const emergency = this.tokens.filter((t) => t.priority === 'EMERGENCY').length;

    const deptDist = this.departments.map((dept) => ({
      name: dept.name,
      code: dept.code,
      count: this.tokens.filter((t) => t.department_id === dept.id).length,
    }));

    const hourlyActivity = [
      { hour: '08:00', count: 12 },
      { hour: '09:00', count: 28 },
      { hour: '10:00', count: 42 },
      { hour: '11:00', count: 35 },
      { hour: '12:00', count: 20 },
      { hour: '13:00', count: 15 },
      { hour: '14:00', count: 30 },
      { hour: '15:00', count: 24 },
    ];

    return {
      totalPatientsToday: total + 140,
      tokensGenerated: total + 140,
      patientsWaiting: waiting,
      patientsInConsultation: inConsultation,
      completedConsultations: completed + 110,
      skippedCount: skipped + 2,
      absentCount: absent + 1,
      emergencyCount: emergency + 4,
      averageWaitingTimeMinutes: 14,
      departmentDistribution: deptDist,
      hourlyActivity,
    };
  }
}

export const globalQueueStore = new QueueStateStore();
