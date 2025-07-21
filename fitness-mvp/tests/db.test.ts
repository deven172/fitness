import { describe, it, expect, beforeAll } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../src/db/db';

beforeAll(async () => {
  await db.dailyPlans.clear();
});

describe('DB', () => {
  it('stores and retrieves daily plan', async () => {
    await db.dailyPlans.put({ date: '2024-01-01', stepsTarget: 1000, caloriesTarget: 2000, proteinTarget: 100, waterTargetMl: 2000, sleepTargetMin: 480 });
    const plan = await db.dailyPlans.get('2024-01-01');
    expect(plan?.stepsTarget).toBe(1000);
  });
});
