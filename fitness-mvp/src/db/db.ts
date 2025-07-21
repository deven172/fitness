import Dexie, { Table } from 'dexie';

export interface DailyPlan {
  date: string;
  stepsTarget: number;
  caloriesTarget: number;
  proteinTarget: number;
  waterTargetMl: number;
  sleepTargetMin: number;
  workoutPlanId?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  scheduledDate: string;
  exercises: string[];
}

export interface WorkoutSession {
  id: string;
  planId: string;
  start: string;
  end?: string;
}

export interface ActualSet {
  sessionId: string;
  exercise: string;
  plannedReps: number;
  actualReps: number;
  actualWeightKg: number;
}

class FitnessDB extends Dexie {
  dailyPlans!: Table<DailyPlan, string>;
  workoutPlans!: Table<WorkoutPlan, string>;
  workoutSessions!: Table<WorkoutSession, string>;
  actualSets!: Table<ActualSet, [string, string]>;

  constructor() {
    super('fitnessDB');
    this.version(1).stores({
      dailyPlans: 'date',
      workoutPlans: 'id',
      workoutSessions: 'id, planId',
      actualSets: '[sessionId+exercise]',
    });
  }
}

export const db = new FitnessDB();
